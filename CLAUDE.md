# Khang's Wrapped — Portfolio

## Project Overview
Personal portfolio for Khang Nguyen, 3rd year CS student at UCSD with a minor in Cognitive Science. The theme is "Khang's Wrapped" — a Spotify Wrapped-inspired portfolio showcasing case work and side projects. The portfolio treats Khang as an "artist" and projects as "albums/playlists."

## Tech Stack
- React 19 + Vite 8
- Tailwind CSS v4
- Framer Motion (animations)
- React Router DOM 7

## Fonts
- **Clash Display** — all headings, navbar brand, hero text
- **Inter** — body text, nav links, subtext, UI elements

## Color Palette
Inspired by ASTRO's "All Light" album cover.
- Background: `#0a2218` (dark green)
- Sidebar/darker bg: `#071230`
- Card background: `#243D2F`
- Accent green: `#4a7c5f` (used for name in hero, italic)
- Gold highlight: `#c9a84c` (used for rotating role text, progress bar, dividers, hover states)
- Sage/muted green: `#6B8F71` (subtle text, secondary elements)
- White: `#ffffff` (primary text)
- Muted: `rgba(255,255,255,0.5)` (secondary text)
- Off-white/cream: `#F2EDE3` (alternative primary text)

## Spacing & Layout
- **Base unit:** 8px — all spacing should be multiples of 8
- **Page outer padding:** 176px each side
- **Hero section padding:** 176px top/bottom
- **Section padding:** 80px top/bottom
- **Component gap:** 24px
- **Card padding:** 24px
- **Small element gap:** 8px or 16px
- **Desktop frame:** 1440px wide, 900px tall (standard Mac height)

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

## Navigation
Top navbar, height: `80px`, with the following links:
- **Home** (house icon)
- **About**
- **Title Tracks** — main featured projects with case studies
- **B-Sides** — extra work without full case studies
- **Resume**

Navbar uses Lucide icons. Spacing between nav links: `32px`. Side padding matches page margin (`176px`). Vertical padding: `24px` top/bottom.

## Layout Structure
```
Top navbar — 80px (static)
Main content — fills remaining height (scrollable)
```

## Hero Section
```
Hi! I'm Khang Nguyen.
I am a [rotating gold text — typewriter effect]
```

Rotating text sequence:
1. Frontend Developer.
2. UI/UX Designer.
3. Software Engineer.
4. CS @ UCSD, Cog Sci minor.
5. music enjoyer.
6. your next hire.

Static subtitle below rotating text:
> 3rd year CS student @ UCSD · minor in Cognitive Science

## Playlist / Works Structure
Projects are organized as Spotify playlists:

| Playlist Name | Description | Type |
|---|---|---|
| **This Is Khang** | "The full discography. Updated when something new drops." | All works |
| **git push --force origin main** | "Built, debugged, shipped. Mostly debugged." | SWE projects |
| **user tested, khang approved** | "Figma files and existential crises." | UI/UX projects |

Filter tabs on works page: **ALL / SWE / UI/UX** — Spotify tab style with gold `#c9a84c` underline on active.

## Projects

### SWE Projects (git push --force origin main)
**Campus Swipe**
- Role: Frontend Developer + UI/UX Designer
- Team: Team of 11
- Live: https://cse110-sp25-group11.github.io/card-game/
- GitHub: https://github.com/cse110-sp25-group11/card-game

**Zippy**
- Role: Frontend Developer + UI/UX Designer
- GitHub + README: https://github.com/jadenseangmany/Zippy
- Devpost: https://devpost.com/software/zippy
- Slide Deck: https://docs.google.com/presentation/d/1B07EC-s_gKoKYDM3ixVy63FpgXOLa59pX0EEuEQowaA/edit?usp=sharing

### UI/UX Projects (user tested, khang approved)
**PlateMate**
- Role: UI/UX Designer
- Figma: https://www.figma.com/proto/9su99fyj0UFOow7y6fBi2c/PlateMate?node-id=105-518
- Slide Deck: https://docs.google.com/presentation/d/1zvstwKLch8cjnIP_77x44PG_3QWiv4K05XwJm1WG89c/edit?usp=sharing

**Bontourismo**
- Role: UI/UX Designer
- Figma: https://www.figma.com/proto/OVBF2StEDZwMtYyTd77WgO/Catalyst-2025-UIUX-Designathon-Wireframe?node-id=19-252
- Devpost: https://devpost.com/software/bontourismo

**PlasticBeach**
- Role: UI/UX Designer
- Final: https://drive.google.com/file/d/1_jWW9Q3IAvawfwOCGiCDSiwZu14qLN4H/view?usp=sharing
- Slide Deck: https://docs.google.com/presentation/d/1eZOh0YGScuLrV9li4Mf-52dDeLcBS564lIW7Wg6i3wU/edit?usp=sharing

**West Coast Adult Soccer League**
- Role: UI/UX Designer
- Status: Work in Progress

## Project Card Fields
Each project card should display:
- Cover image
- Track number (01, 02, 03 format — per playlist)
- Project title
- Role
- Team size (e.g. "Solo", "Team of 3", "Team of 11")
- Start date — End date
- Tech stack tags
- Links (Live, GitHub, Figma, Devpost — show only if available)

## Icons
Use **Lucide Icons** throughout. Key icons:
| Section | Icon |
|---|---|
| Home/Logo | `Home` |
| About | `Mic2` |
| Title Tracks / Works | `Library` |
| B-Sides | `Music` |
| Resume | `Download` |
| SWE playlist | `Code2` |
| UI/UX playlist | `Pen` or `Figma` |
| Hackathon playlist | `Zap` |
| All Works | `Library` |

## Animations
Use **Framer Motion** for:
- Typewriter/ticker effect on hero rotating text
- Page transitions
- Hover states on project cards (play button appears over album art)
- Marquee/auto-scroll on Now Playing bar

## Design Principles
- Dark enough to feel like Spotify but unique with the forest green palette
- Gold accent `#c9a84c` used sparingly for highlights — buttons, active states, dividers
- Cards should feel like album covers — square-ish cover image, title below
- Scrollbar hidden on inner panels for clean look
- Mobile responsive with breakpoints at `768px` (tablet) and `390px` (mobile)

## Inspiration
- Spotify's UI structure and layout
- ASTRO "All Light" album cover color palette
- Spotify Wrapped annual review format