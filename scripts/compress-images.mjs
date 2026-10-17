#!/usr/bin/env node
/**
 * Compress images in public/images/ to .webp
 *
 * - Converts .png/.jpg/.jpeg over 300 KB to .webp
 * - Quality 85 for UI/screenshots, 78 for about/ photos
 * - Resizes anything wider than 2000px (keeps aspect ratio, never upscales)
 * - Skips SVGs, GIFs, favicon, and files under 300 KB
 *
 * Usage: node scripts/compress-images.mjs
 */

import sharp from "sharp";
import { readdir, stat, rm } from "node:fs/promises";
import { join, extname, basename, relative } from "node:path";

const ROOT = new URL("../public/images", import.meta.url).pathname;
const SIZE_THRESHOLD = 300 * 1024; // 300 KB
const MAX_WIDTH = 2000;
const EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const PHOTO_QUALITY = 78;
const UI_QUALITY = 85;

// about/ folder contains photos — use lower quality
function qualityFor(filePath) {
  const rel = relative(ROOT, filePath);
  return rel.startsWith("about/") ? PHOTO_QUALITY : UI_QUALITY;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function processFile(filePath) {
  const info = await stat(filePath);
  if (info.size < SIZE_THRESHOLD) return null;

  const quality = qualityFor(filePath);
  const meta = await sharp(filePath).metadata();

  const needsResize = meta.width > MAX_WIDTH;
  let pipeline = sharp(filePath);
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  pipeline = pipeline.webp({ quality });

  const outPath = filePath.replace(/\.(png|jpe?g)$/i, ".webp");
  await pipeline.toFile(outPath);

  const outInfo = await stat(outPath);
  const rel = relative(ROOT, filePath);
  const relOut = relative(ROOT, outPath);

  return {
    original: rel,
    converted: relOut,
    oldSize: info.size,
    newSize: outInfo.size,
    oldDims: `${meta.width}x${meta.height}`,
    resized: needsResize,
    quality,
  };
}

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  return (bytes / 1024).toFixed(0) + " KB";
}

const files = await walk(ROOT);
const results = [];
let totalOld = 0;
let totalNew = 0;

for (const f of files) {
  const r = await processFile(f);
  if (r) {
    results.push(r);
    totalOld += r.oldSize;
    totalNew += r.newSize;
  }
}

// Print results table
console.log("\n" + "=".repeat(100));
console.log("IMAGE COMPRESSION RESULTS");
console.log("=".repeat(100));
console.log(
  "File".padEnd(45),
  "Old".padEnd(10),
  "New".padEnd(10),
  "Saved".padEnd(10),
  "Dims".padEnd(14),
  "Q",
);
console.log("-".repeat(100));

for (const r of results) {
  const saved = ((1 - r.newSize / r.oldSize) * 100).toFixed(0) + "%";
  const dims = r.resized ? `${r.oldDims} → ${MAX_WIDTH}w` : r.oldDims;
  console.log(
    r.original.padEnd(45),
    fmt(r.oldSize).padEnd(10),
    fmt(r.newSize).padEnd(10),
    saved.padEnd(10),
    dims.padEnd(14),
    String(r.quality),
  );
}

console.log("-".repeat(100));
console.log(
  `TOTAL: ${fmt(totalOld)} → ${fmt(totalNew)}  (saved ${fmt(totalOld - totalNew)}, ${((1 - totalNew / totalOld) * 100).toFixed(0)}%)`,
);
console.log(`Converted ${results.length} files.`);
console.log("=".repeat(100));
