# Khang's Wrapped — Portfolio

## Project Overview
Personal portfolio for Khang Nguyen, 3rd year CS student at UCSD with a minor in Cognitive Science. The theme is "Khang's Wrapped" — a Spotify Wrapped-inspired portfolio showcasing case work and side projects. The portfolio treats Khang as an "artist" and projects as "albums/playlists."

## Tech Stack
- React 19 + Vite 8 (NOT Next.js — do not use "use client" directives)
- Tailwind CSS v4
- Framer Motion (animations)
- React Router DOM 7
- Deployed on Vercel

## Fonts
- **Clash Display** — all headings, navbar brand, hero text
- **Inter** — body text, nav links, subtext, UI elements
- **Island Funny** — handwritten annotation font (used on case study pages for annotated images). Loaded via `@font-face` in `index.css`, OTF file at `/fonts/IslandFunny-5yMXx.otf`

## File Structure
```
src/
├── App.jsx              — Router setup, all routes defined here
├── index.css            — Global styles, @font-face, responsive CSS, animations
├── pages/
│   ├── Home.jsx         — Landing page with hero, title tracks carousel, footer
│   ├── About.jsx        — About page
│   ├── Playlist.jsx     — Playlist/works listing page
│   ├── CaseStudy.jsx    — Generic case study page
│   └── PlasticBeachCaseStudy.jsx — PlasticBeach case study (in progress)
├── components/
│   ├── FooterWithSpotlight.jsx  — Shared footer component
│   └── ProjectDetail.jsx        — Project detail view
```

## Routes
| Path | Component | Description |
|---|---|---|
| `/` | Home | Landing page |
| `/about` | About | About page |
| `/playlist` | Playlist | Works listing |
| `/case-study` | CaseStudy | Generic case study |
| `/case-study/plastic-beach` | PlasticBeachCaseStudy | PlasticBeach case study |

## Design System — Color Palette

### Background & Surfaces

| Role | Name | Hex |
|---|---|---|
| Base background | Carbon Black | `#262626` |
| Cards, sidebars, elevated surfaces | Vintage Grape | `#4E4A5C` |

### Accent Colors

| Role | Name | Hex |
|---|---|---|
| Primary accent — headlines, CTAs, highlights, active states | Periwinkle | `#C4B5FD` |
| Secondary accent — icons, dividers, labels, placeholder text | Amethyst Smoke | `#9D92C8` |

### Text

| Role | Name | Hex |
|---|---|---|
| Primary body text | Alabaster Grey | `#E8E8E3` |
| Secondary / muted text | — | `rgba(255,255,255,0.5)` |

### Usage Rules

- **Background:** Always use `#262626` as the base. Never place body text directly on `#4E4A5C` without sufficient contrast checking.
- **Elevated surfaces:** Use `#4E4A5C` for cards, modals, sidebars, and drawers to create depth within the dark theme.
- **Primary accent (`#C4B5FD`):** Reserve for the single most important interactive or highlighted element per view — headlines, primary buttons, active nav items, hover states.
- **Secondary accent (`#9D92C8`):** Use freely for supporting UI — secondary labels, icon fills, border/divider lines, disabled states.
- **Text:** Use `#E8E8E3` for all primary readable content. Use `rgba(255,255,255,0.5)` for helper text, timestamps, and metadata.
- **Borders:** Default to `#4E4A5C` for subtle borders; use `#9D92C8` for emphasized or focused borders.

### Palette at a Glance

```
#262626  ████  Carbon Black    — base background
#4E4A5C  ████  Vintage Grape   — elevated surfaces
#9D92C8  ████  Amethyst Smoke  — secondary accent
#C4B5FD  ████  Periwinkle      — primary accent
#E8E8E3  ████  Alabaster Grey  — primary text
```

## CSS Classes (index.css)
- `.gradient-text` — purple gradient with `background-clip: text` (used for annotations, highlights)
- `.gradient-shimmer` — animated shimmer gradient text
- `.pulsing-glow` — purple text-shadow glow animation
- `.blob-cursor` — morphing blob border-radius animation
- Responsive CSS variables: `--page-padding`, `--section-padding` (scale down at breakpoints)
- Mobile menu: `.mobile-menu-overlay`, `.nav-links-desktop`, `.nav-hamburger`

## Spacing & Layout
- **Base unit:** 8px — all spacing should be multiples of 8
- **Page outer padding:** Uses CSS variable `--page-padding` (158px desktop → 16px mobile)
- **Section padding:** Uses CSS variable `--section-padding` (158px desktop → 48px mobile)
- **Component gap:** 24px
- **Card padding:** 24px
- **Small element gap:** 8px or 16px

## Responsive Breakpoints
| Breakpoint | `--page-padding` | `--section-padding` |
|---|---|---|
| > 1279px | 158px | 158px |
| ≤ 1279px | 80px | 100px |
| ≤ 1024px | 48px | 80px |
| ≤ 768px | 24px | 64px |
| ≤ 480px | 16px | 48px |

At 768px: hamburger menu replaces desktop nav, flex layouts go to column, card hover images hidden.

## Typography Scale
| Element | Size | Weight |
|---|---|---|
| Hero/Big title | 64px | Bold |
| Section heading | 32px | Semibold |
| Card title | 20px | Semibold |
| Body text | 16px | Regular |
| Subtle/caption | 14px | Regular |
| Tiny labels | 12px | Medium |

- Heading line height: `1.2`
- Body line height: `1.6`
- Annotations use `clamp()` for responsive sizing (e.g. `clamp(10px, 1.5vw, 18px)`)

## Navigation
Top navbar, height: `72px`, sticky, with box-shadow glow. Links:
- **Home** — brand text "Khang's Wrapped" links to `/`
- **About** → `/about`
- **Title Tracks** → scrolls to section on home / `/playlist`
- **B-Sides** → extra work
- **Resume** → external link

Mobile: hamburger icon (Menu/X from Lucide) triggers full-screen overlay menu.

## Hero Section (Home)
```
Hi! I'm Khang Nguyen.
I am a [rotating purple text — typewriter effect]
```

Rotating text uses Periwinkle (`#C4B5FD`) accent color. Ditto image appears next to hero text.

## Projects

### SWE Projects (git push --force origin main)
**Campus Swipe**
- Type: Full-Stack Development, UI/UX Design
- Role: Frontend Developer + UI/UX Designer
- Team: Team of 11
- Live: https://cse110-sp25-group11.github.io/card-game/
- GitHub: https://github.com/cse110-sp25-group11/card-game

**Zippy**
- Type: Full-Stack Development, UI/UX Design
- Role: Frontend Developer + UI/UX Designer
- GitHub + README: https://github.com/jadenseangmany/Zippy
- Devpost: https://devpost.com/software/zippy

### UI/UX Projects (user tested, khang approved)
**PlateMate**
- Type: UI/UX Design, Product Design
- Role: UI/UX Designer
- Figma: https://www.figma.com/proto/9su99fyj0UFOow7y6fBi2c/PlateMate?node-id=105-518

**Bontourismo**
- Type: UI/UX Design, Product Design
- Role: UI/UX Designer
- Figma: https://www.figma.com/proto/OVBF2StEDZwMtYyTd77WgO/Catalyst-2025-UIUX-Designathon-Wireframe?node-id=19-252

**PlasticBeach** (has dedicated case study page at `/case-study/plastic-beach`)
- Type: Product Design, UX Design, Web Redesign
- Summary: Redesigned the site and recycling materials for a SoCal nonprofit cutting soft-plastic waste across 40+ retail and distribution partners.
- Role: UI/UX Designer
- Team: 5 Designers
- Case study includes: full-viewport hero, metadata section, Overview, Placard Redesign (Problem/Outcome), annotated old placard image with Island Funny font annotations using gradient-text class

**West Coast Adult Soccer League**
- Type: Web Design, Product Design
- Summary: Designed and launched a full website for an 800+ player South OC soccer league.
- Role: UI/UX Designer + Web Designer

## Case Study Page Pattern
Case study pages follow this structure:
1. Sticky navbar (same as all pages)
2. Full-viewport hero image with gradient overlay
3. Metadata bar (Role, Team, Type, Timeline)
4. Section divider
5. Content sections with headings and subheadings (Problem/Outcome)
6. Annotated images — absolutely positioned `motion.div` annotations around a centered image container, using Island Funny font + `gradient-text` class, with `whileInView` fade-in animations
7. Footer (FooterWithSpotlight component)

## Animations
Use **Framer Motion** for:
- Typewriter/ticker effect on hero rotating text
- `whileInView` fade-in animations on sections and annotations
- Hover states on project cards
- Marquee/auto-scroll on Now Playing bar
- Page scroll-to-top on mount (`window.scrollTo`)

## Design Principles
- Dark theme inspired by Spotify but unique with purple accent palette
- Primary accent `#C4B5FD` (Periwinkle) for highlights, active states, gradient text
- Cards should feel like album covers — square-ish cover image, title below
- Mobile responsive — hamburger nav at 768px, layouts reflow to column
- Annotations on case study images use handwritten font for personal touch

## Icons
Use **Lucide Icons** throughout (Menu, X, Home, etc.)

## Agent Send-Off

When you are done with your work, end with a brief, friendly wrap-up:
- Summarize what was changed (1-3 bullet points max)
- Mention any files that were modified
- If something is still in progress or needs the user's attention, flag it
- Keep it short — no essays, no fluff
- Sign off with: "Let me know if you want to tweak anything!"