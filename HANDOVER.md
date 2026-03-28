# Portfolio-Next — Architecture & Handover
**Project:** portfolio-next (Next.js 15 + React 19)
**Developer:** Sriram Voonna
**Last Updated:** March 28, 2026
**GitHub:** https://github.com/sriramv1-dev/portfolio-next
**Live URL:** https://sriram-voonna-portfolio.vercel.app
**Local:** /Users/sriram_sweta/Documents/GitHub/portfolio-next

---

## Status Legend
- ✅ Done
- 🔲 Decided, not yet implemented
- 💬 In discussion
- ❌ Rejected
- 🔮 Future task — don't forget

---

## 🚨 Rules — Never Break These
- **Never use CSS media queries** — always use `useResponsive` hook for all breakpoint logic
- **ThemeSwitcher localStorage key has a typo:** `portfilio.theme` (not portfolio) — do NOT fix, it will break existing user preferences
- **Theme is applied via:** `document.documentElement.setAttribute('color-scheme', 'dark'|'light')`
- **Desktop sidebar is 72px wide** — all page content uses `padding-left: 72px` via `box-sizing: border-box` on `.container`
- **Breakpoints:** mobile ≤767px, tablet 768–1279px, desktop ≥1280px
- **Commit convention:** `feat:`, `fix:`, `refactor:`, `style:`, `chore:`
- **Branch naming:** `fix/issue-number-description` or `feat/issue-number-description`
- **Merge strategy:** Squash merge to keep `main` clean
- **PR workflow:** branch → fix → commit → push → PR → squash merge → Vercel auto-deploys
- **Unit tests:** Deferred until after UI/UX redesign — components still changing too frequently

---

## Migration Status
| Task | Status |
|---|---|
| Next.js 15 scaffold | ✅ |
| All pages migrated | ✅ |
| Navbar migrated | ✅ |
| Global SCSS + CSS variables | ✅ |
| ThemeSwitcher migrated + fixed | ✅ |
| Color picker panel fixed | ✅ |
| Push to GitHub (new repo) | ✅ |
| Deploy to Vercel | ✅ |
| PR workflow established | ✅ |
| GitHub Issues + Project Board | ✅ |

---

## Git & Project Board
- **GitHub repo:** https://github.com/sriramv1-dev/portfolio-next
- **Project board:** https://github.com/users/sriramv1-dev/projects/1/views/1
- **Labels:** `bug`, `enhancement`, `web`, `tablet`, `mobile`, `layout`, `feature`, `backlog`, `in-progress`, `done`

---

## Topic 1 — Component Architecture ✅ LOCKED

### Decisions
| Decision | Choice |
|---|---|
| Folder structure | Feature-based (`src/features/`) |
| Logo | Own component `Logo.tsx` |
| MobileMenu state | Navbar owns it, passes down as props |
| TypeScript interfaces | Define now in `src/types/index.ts` |
| Context for theme | Yes — `ThemeContext.tsx` |
| Redux | ❌ No — overkill |
| State management now | Context + useState |
| State management future | React Query for API data |
| UI library (portfolio) | ❌ None — CSS Modules + CSS variables |
| UI library (CRUD app) | Shadcn/ui when we get there |

### Current Folder Structure (actual state)
```
src/
├── app/
│   ├── companies/
│   │   ├── CompaniesTimeline.tsx       ← desktop+tablet, accepts isTablet prop
│   │   ├── CompaniesTimelineMobile.tsx ← mobile single-column
│   │   ├── ct.module.css               ← renamed (cache bust) — keep this name
│   │   ├── companies-timeline-mobile.module.css
│   │   ├── page.tsx                    ← client, uses useResponsive
│   │   └── layout.tsx                  ← metadata
│   ├── skills/
│   │   ├── SkillsBig.tsx               ← D3 tree (desktop only)
│   │   ├── SkillsTablet.tsx            ← renamed from SkillsSmall
│   │   ├── SkillsMobile.tsx            ← new SVG spine tree (mobile)
│   │   ├── SkillsMobile.module.css
│   │   └── page.tsx                    ← isDesktop→SkillsBig, isTablet→SkillsTablet, isMobile→SkillsMobile
│   ├── home.scss
│   └── page.tsx
├── features/
│   ├── navigation/
│   │   ├── Navbar.tsx                  ← uses useResponsive, renders correct ThemeSwitcher
│   │   ├── NavLinks.tsx
│   │   ├── MobileMenu.tsx              ← no ThemeSwitcherMobile here anymore
│   │   └── MobileMenu.module.css
│   └── home/
│       ├── Hero.tsx                    ← uses useResponsive for padding
│       └── HomeLayout.tsx
├── components/
│   ├── Navbar.scss                     ← 3 media query blocks
│   ├── ThemeSwitcherWeb.tsx            ← vertical column, desktop sidebar
│   ├── ThemeSwitcherTablet.tsx         ← horizontal row, top navbar
│   ├── ThemeSwitcherMobile.tsx         ← horizontal row, IN top navbar (has inNavbar prop)
│   ├── MyLogo.tsx                      ← SVG avatar, viewBox="200 100 1240 2180"
│   └── ui/                             ← custom UI toolkit (Level 1) — future
├── context/
│   └── ThemeContext.tsx
├── hooks/
│   ├── useThemeSwitcher.ts             ← shared hook for all 3 ThemeSwitcher variants
│   ├── useResponsive.ts
│   └── useLocalStorage.ts
├── lib/
│   └── data.ts                         ← skills tree hierarchy + experienceData
├── data/
│   └── portfolio.ts
└── styles/
    └── globals.css                     ← .container has box-sizing: border-box (critical)
```

### Implementation Tasks
- ✅ Create `src/context/ThemeContext.tsx`
- ✅ Create `src/hooks/useResponsive.ts`
- ✅ Split Navbar → NavLinks, MobileMenu
- 🔲 Create `src/types/index.ts` with NavRoute, SocialLink, Project, Experience interfaces
- 🔲 Create `src/features/` full structure + move remaining components
- 🔲 Create `Logo.tsx` component
- 🔲 Update `app/` pages to import from features
- 🔲 Create `src/lib/utils.ts`

---

## Topic 2 — Styling ✅ LOCKED

### Decisions
| Decision | Choice |
|---|---|
| Styling system | CSS Modules + CSS variables |
| Global styles | Design tokens only in `globals.css` |
| Component styles | CSS Modules per feature folder |
| Migration strategy | Incremental — CSS Modules for new, SCSS for legacy until redesign |
| External library | ❌ None for portfolio |
| Naming convention | camelCase in CSS Modules |
| Token system | Keep existing + add spacing + typography tokens |

### Implementation Tasks
- 🔲 Add spacing + typography tokens to `globals.css`
- 🔲 Migrate each feature to CSS Modules when touching that component

---

## Topic 3 — Responsiveness ✅ LOCKED

### Decisions
| Decision | Choice |
|---|---|
| Implementation | `useSyncExternalStore` + `matchMedia` (React 19 native) |
| Breakpoints | mobile ≤767px, tablet 768–1279px, desktop ≥1280px |
| Debounce | Not needed — `matchMedia` fires only at breakpoint crossing |
| CSS show/hide | ❌ Replaced with JSX conditionals via `useResponsive` |

### Implementation Tasks
- ✅ Create `src/hooks/useResponsive.ts`
- ✅ Replace all CSS show/hide in Navbar with `useResponsive`

---

## Topic 4 — Performance ✅ LOCKED

| Optimization | Priority | Status |
|---|---|---|
| Migrate Reem Kufi Ink + Roboto to `next/font` | High | 🔲 |
| Remove `@import` from globals.css | High | 🔲 |
| Dynamic import D3 Skills chart | High | 🔲 |
| `next/image` for all images | High | 🔲 |
| Suspense boundaries | Medium | 🔲 After redesign |
| React Query for API | Future | 🔮 Phase D |

---

## Topic 5 — TypeScript ✅ LOCKED

| Decision | Choice |
|---|---|
| Use TypeScript | ✅ Yes |
| Strict mode | ✅ Keep enabled |
| Convert `.jsx` to `.tsx` | ✅ During refactor |
| Shared types | ✅ `src/types/index.ts` |
| No implicit `any` | ✅ Enforced |
| When to enforce | During refactor — fix as we touch each file |

---

## Topic 6 — Animation ✅ LOCKED

| Decision | Choice |
|---|---|
| Animation library | Framer Motion |
| Style | Professional base + expressive at key moments |
| Page transitions | Subtle fade + slide |
| Hero | Staggered text reveal |
| Sections | Scroll-triggered, `once: true` |
| Cards | Creative hover with scale + lift |
| Replace animate.css | ✅ Yes |

### Implementation Tasks
- 🔲 Install Framer Motion
- 🔲 Add page transitions to layout.tsx
- 🔲 Add Hero staggered animation
- 🔲 Add scroll-triggered animations per section
- 🔲 Add card hover animations
- 🔲 Remove animate.css

---

## Topic 7 — SEO ✅ LOCKED

| Decision | Choice |
|---|---|
| Target keywords | "Sriram Voonna", "Full Stack Developer", "React developer" |
| Domain now | `sriramvoonna.vercel.app` |
| Domain future | `sriramvoonna.dev` 🔮 |
| `generateMetadata` per page | ✅ |
| Sitemap | ✅ `src/app/sitemap.ts` |
| robots.txt | ✅ `src/app/robots.ts` |
| Open Graph + Twitter cards | ✅ |
| OG image | ✅ Auto-generated with `ImageResponse` |
| JSON-LD structured data | ✅ Person schema |

### Implementation Tasks
- 🔲 Add `generateMetadata` to each page
- 🔲 Create `src/app/sitemap.ts`
- 🔲 Create `src/app/robots.ts`
- 🔲 Create `src/app/opengraph-image.tsx`
- 🔲 Add JSON-LD Person schema to layout.tsx

---

## Topic 8 — Git Workflow ✅ LOCKED

| Decision | Choice |
|---|---|
| Branching strategy | Feature branches off `main` |
| Commit convention | `feat:`, `fix:`, `refactor:`, `style:`, `chore:` |
| Merge strategy | Squash merge |
| Remote | `portfolio-next` repo on GitHub |
| Deploy | Vercel auto-deploy on merge to `main` |
| Issue tracking | GitHub Issues + Project Board |

---

## SkillsMobile Component — Architecture Notes

**File:** `src/app/skills/SkillsMobile.tsx`

### Design
- Vertical center spine with category boxes sitting ON the spine
- Categories alternate left/right: Front-End(both), Back-End(right), AI Integration(left), Data(right), Cloud(left), Tools(right), Languages(left)
- D3-style cubic bezier curves connecting nodes
- 3-level color depth: cat box (full color) → L0 (muted tint) → L1 (darker tint) → L2 (outline only)
- **Theme detection:** MutationObserver watches `document.documentElement.getAttribute('color-scheme')` and re-renders SVG on change
- **Dark mode text:** `rgba(255,255,255,0.9)`
- **Light mode text:** `rgba(0,0,0,0.75)`, stronger borders (`sw: 1.5`), darker connectors

### Category Colors
| Category | Color | Note |
|---|---|---|
| Front-End | `#1D9E75` | Changed from #02fac0 — better light mode visibility |
| Back-End | `#5cb50e` | |
| AI Integration | `#a855f7` | Between Back-End and Data — narrative: BE→AI→Data |
| Data | `#f8cc1b` | |
| Cloud | `#1982c4` | |
| Tools | `#fb6f92` | |
| Languages | `#c20c51` | |

### Layout Constants
```
SVG_W = 390, SPINE_X = 195
CB_W = 68, CB_H = 38
COL_W = [78, 68, 52], PILL_H = [23, 21, 19], PILL_RX = [13, 11, 10]
COL_GAP = 8, ROW_GAP = 5, CAT_GAP = 16
```

---

## Companies Timeline — Architecture Notes

- **Desktop:** `CompaniesTimeline isTablet={false}` — split layout, company info left, responsibilities right
- **Tablet:** `CompaniesTimeline isTablet={true}` — same layout, adjusted padding via inline style
- **Mobile:** `CompaniesTimelineMobile` — single column card layout
- `ct.module.css` was renamed from `companies-timeline.module.css` to force Next.js cache bust — **keep this name**
- The root fix for horizontal scroll was adding `box-sizing: border-box` to `.container` in `globals.css`

---

## Completed Tickets (March 2026)
| # | Title | Branch |
|---|---|---|
| #4 | Mobile theme icons moved to top navbar | fix/4-mobile-sidemenu-theme-icons |
| #7 | SkillsMobile vertical spine tree | feat/7-skills-mobile-spine |
| #14 | Netlify redirect to Vercel URL | fix/14-netlify-redirect |
| #17 | Home page empty space + SVG viewBox | fix/17-web-hero-empty-space |
| #25 | AI Integration + Spring Boot + MongoDB + Java added to skills data | feat/25-ai-integration-skills-data |
| #27 | SkillsMobile light mode pill fills | fix/27-skills-mobile-light-mode |

---

## Open Tickets (Backlog)
| # | Title | Breakpoint | Priority |
|---|---|---|---|
| #1 | SV logo color not changing on theme switch | Mobile | Medium |
| #2 | Hero image too small | Mobile | Medium |
| #3 | Replace hero image with better one | Mobile | Low |
| #5 | Color slider placement | Mobile | Medium |
| #6 | Companies cards accent color border | Mobile | Medium |
| #8 | Home page image/intro text misaligned | Tablet | Medium |
| #9 | Companies top cutoff | Tablet | Medium |
| #10 | Timeline dot should follow accent color | Tablet | Medium |
| #11 | Timeline left/right structure | Tablet | High |
| #12 | Ideas and tools text spacing | Tablet | Low |
| #13 | Contact page content centered | Tablet | Medium |
| ~~#14~~ | ~~Redirect Netlify to new app link~~ | — | ✅ Done |
| #15 | Skills page redesign | Tablet | Low |
| #16 | Add AI to skills | Tablet | Low |
| #18 | Home page content centering | Web | Medium |
| #19 | Skills D3 chart overflow | Web | High |
| #20 | Skills start point indicator | Web | Low |
| #21 | Change color palette | Web | Low |
| #22 | Add AI to skills | Web | Low |
| ~~#25~~ | ~~Add AI Integration to web + tablet skills data~~ | Web+Tablet | ✅ Done |
| #30 | SkillsBig desktop D3 chart redesign — fix layout overflow and visual polish | Web | High |

---

## Immediate Next Tasks (pick up here)
1. **#30 — SkillsBig D3 redesign** — fix first-load blank render (#19), rebalance layout for new categories
2. **#6 — Companies mobile card accent color border** — `CompaniesTimelineMobile.tsx`, index-based accent colors
3. **#11 — Timeline tablet structure** — partially fixed, needs final polish

---

## Implementation Phases

### Phase A — Foundation
1. ✅ Create `src/context/ThemeContext.tsx`
2. ✅ Create `src/hooks/useResponsive.ts`
3. ✅ Create `src/features/` structure + move components
4. ✅ Split Navbar → NavLinks, MobileMenu
5. 🔲 Create `src/types/index.ts`
6. 🔲 Add spacing + typography tokens to `globals.css`
7. 🔲 Migrate fonts to `next/font`
8. 🔲 Dynamic import D3 chart

### Phase B — SEO + Deploy
1. 🔲 `generateMetadata` per page
2. 🔲 Sitemap + robots.txt
3. 🔲 OG image + JSON-LD schema
4. ✅ Push to GitHub
5. ✅ Deploy to Vercel

### Phase C — Animation
1. 🔲 Install Framer Motion
2. 🔲 Page transitions + Hero animation
3. 🔲 Section scroll animations
4. 🔲 Card hover animations
5. 🔲 Remove animate.css

### Phase D — Future 🔮
1. API for portfolio data
2. Resume builder (generate + download PDF)
3. UI/UX redesign (About, Projects, other sections)
4. Custom domain `sriramvoonna.dev` (~$12/year on Namecheap)
5. React Query when API added
6. Lighthouse audit
7. Footer proper design
8. npm audit (5 pre-existing vulnerabilities)
9. Monorepo evaluation when 2+ apps share UI toolkit

---

## UI Toolkit — Separate Track 🔮
**Create separate Claude Project: "SV UI Toolkit"**
- Start: Level 1 — inside `src/components/ui/`
- Move to Level 2 (separate repo) when CRUD app starts
- Level 3 (monorepo) — evaluate when 2+ apps exist
- Components to build: Button, Card, Input, Icon, Badge, Logo, Modal, Typography
