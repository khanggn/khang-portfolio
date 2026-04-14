import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Playlist() {
  return (
    <div className="min-h-screen bg-[#262626] text-white flex flex-col">
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 bg-[#262626] border-b border-white/10"
        style={{
          height: '80px',
          padding: '24px 176px',
          boxShadow: '0 8px 24px rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="flex justify-between items-center h-full">
          <Link
            to="/"
            className="text-3xl font-bold"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Khang's Wrapped
          </Link>
          <div
            className="flex items-center text-base"
            style={{ fontFamily: "'Inter', sans-serif", gap: '32px' }}
          >
            <Link to="/" className="hover:text-[#C4B5FD] transition-colors">
              Home
            </Link>
            <Link to="/#about" className="hover:text-[#C4B5FD] transition-colors">
              About
            </Link>
            <Link to="/playlist" className="hover:text-[#C4B5FD] transition-colors text-[#C4B5FD]">
              Playlist
            </Link>
            <a
              href="/resume/khangresume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C4B5FD] transition-colors"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1" style={{ padding: '80px 176px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="font-bold"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: '64px',
              lineHeight: '1.2',
              marginBottom: '24px'
            }}
          >
            All My Work
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '64px'
            }}
          >
            The full discography. Updated when something new drops.
          </p>

          {/* Placeholder for project grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {/* Projects will go here */}
            <div style={{
              height: '400px',
              backgroundColor: '#4E4A5C',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.5)'
            }}>
              Projects coming soon...
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default Playlist;
