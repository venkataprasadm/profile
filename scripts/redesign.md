# SPEC — "Product Quest": AI-Centric Gamified Portfolio Website for a Senior Product Owner

**Version:** 1.0
**Date:** 2026-07-07
**Audience:** Autonomous coding agent (this document is the single source of truth — do not ask for design decisions unless a blocker is listed in §14)

---

## 1. Project Summary

Redesign an existing personal portfolio website of a **Senior Product Owner** into a modern, **AI-centric, playful, high-energy, gamified, fully animated interactive experience**.

The site should feel like a cross between:
- a **video-game character screen** (the Product Owner is the "playable character"),
- a **product dashboard** (fitting the PO profession), and
- an **AI product demo** (an embedded AI assistant that answers questions about the owner).

**Core metaphor:** *Visiting the site = playing a short game where you "unlock" the Product Owner's profile.* Recruiters and stakeholders in a hurry must still be able to skip the game entirely and read everything in a classic layout.

### Inputs the agent must consume before building
| Input | Source | Placeholder used in this spec |
|---|---|---|
| Old website URL or export | Provided by user / repo folder | `{{OLD_SITE}}` |
| Owner's name, title, photo | Old website | `{{OWNER_NAME}}`, `{{OWNER_TITLE}}` |
| Bio, work history, skills, certifications | Old website | `{{CONTENT.*}}` |
| Case studies / projects | Old website | `{{PROJECTS[]}}` |
| Contact links (email, LinkedIn, etc.) | Old website | `{{SOCIALS[]}}` |
| Resume PDF | Old website | `{{RESUME_PDF}}` |

**Rule:** All copy must be migrated from `{{OLD_SITE}}` verbatim first, then lightly rewritten into the energetic tone described in §4 (keep facts identical; never invent employers, dates, metrics, or certifications).

---

## 2. Goals & Non-Goals

### Goals
1. Position the owner as a forward-looking, AI-fluent Senior Product Owner.
2. Make the site memorable: visitors should want to share it.
3. Keep it fast, accessible, and recruiter-friendly despite heavy animation.
4. Ship as a static-first site deployable to Vercel/Netlify with zero server maintenance (one optional serverless function for the AI chat, §7).

### Non-Goals
- No user accounts, databases, or CMS (content lives in typed content files).
- No blog engine in v1 (reserve `/blog` route; render "Coming soon" quest board).
- No heavy 3D scenes that break mobile performance (small tasteful 3D accents only).
- No dark patterns; gamification never gates contact info or the resume.

---

## 3. Tech Stack (fixed — do not substitute)

| Concern | Choice |
|---|---|
| Framework | **Next.js 15+ (App Router, TypeScript, React 19)** |
| Styling | **Tailwind CSS v4** + CSS variables for theming |
| Animation | **Framer Motion** (primary), **GSAP + ScrollTrigger** (scroll scenes), **Lottie** (micro-illustrations), `canvas-confetti` (rewards) |
| 3D accents (optional, lazy-loaded) | React Three Fiber + drei — hero accent only |
| State | **Zustand** (persisted to `localStorage`) for game state |
| AI chat | Vercel AI SDK + Anthropic API (`claude-haiku-4-5-20251001` for cost) behind one serverless route; graceful static fallback (§7) |
| Icons | lucide-react |
| Fonts | Variable fonts via `next/font`: display = "Space Grotesk" (or similar geometric), body = "Inter" |
| Analytics | Plausible or Vercel Analytics (privacy-friendly, no cookie banner needed) |
| Testing | Vitest + React Testing Library; Playwright for the 5 critical flows in §13 |
| Lint/format | ESLint + Prettier, strict TS (`noUncheckedIndexedAccess: true`) |

Project layout:

```
/src
  /app                  # routes
  /components/ui        # buttons, cards, badges, HUD
  /components/sections  # hero, skills, timeline, projects...
  /components/game      # XP engine UI, achievements, confetti, easter eggs
  /lib/game             # game-state store, achievement definitions, xp rules
  /lib/ai               # chat route helpers, system prompt, fallback answers
  /content              # ALL site copy as typed TS/MDX (migrated from {{OLD_SITE}})
  /styles
/public/lottie /public/images
```

---

## 4. Brand, Tone & Visual Language

### Tone of voice
Energetic, witty, confident, never cringe. Gaming vocabulary used lightly ("unlocked", "level", "quest", "achievement"), professional facts always stated plainly. Example rewrite: *"10 years leading agile teams"* → *"⚔️ 10-year campaign leading agile teams — main quest still in progress."*

### Theme
- **Dark mode default** ("Arcade" theme), light mode toggle ("Daylight" theme). Persist choice.
- Palette (CSS variables):
  - `--bg: #0B0F1A` (deep space navy)
  - `--surface: #131A2B`
  - `--primary: #7C5CFF` (electric violet)
  - `--accent: #22E4AC` (neon mint — XP/success)
  - `--warning: #FFB020` (achievement gold)
  - `--danger: #FF5470`
  - `--text: #E8ECF8`, `--text-muted: #93A0BF`
- Glassmorphism cards (blur + 1px neon border), soft glow shadows on interactive elements, subtle grid/starfield background with parallax.
- Border radius 16px cards / 999px pills. 8-point spacing grid.

### Motion principles
1. Every interactive element has hover + press feedback (scale 0.97 press, glow hover).
2. Sections animate in on scroll (staggered fade+rise, 60–90ms stagger).
3. Physics-feel springs (Framer `type: "spring", stiffness ~260, damping ~20`), not linear tweens.
4. One "wow" scroll-driven scene max per page (GSAP ScrollTrigger).
5. **`prefers-reduced-motion` honored globally:** all animation collapses to simple fades, particle/3D layers unmount entirely, XP still works.

---

## 5. Gamification System (the core differentiator)

### 5.1 XP & Levels
Visitors earn XP for exploring. Persisted in `localStorage` (`po_game_state_v1`). No backend.

| Action | XP | Once? |
|---|---|---|
| First visit | 10 | yes |
| Scroll each major section into view | 15 | per section |
| Open a project case study | 25 | per project |
| Complete the skills mini-interaction (§6.3) | 30 | yes |
| Ask the AI assistant a question | 20 | first only |
| Download resume | 40 | yes |
| Click a contact/social link | 25 | yes |
| Find an easter egg (§5.4) | 50 | each |
| Toggle theme | 5 | yes |

Levels: **Lv1 Visitor (0) → Lv2 Stakeholder (50) → Lv3 Collaborator (120) → Lv4 Sprint Ally (220) → Lv5 Product Legend (350)**. Level-up = confetti burst + toast + subtle sound (sound OFF by default, toggle in HUD).

### 5.2 HUD (persistent overlay)
Compact top-right pill (bottom bar on mobile): avatar chip, level name, animated XP progress bar, achievements counter (`7/12`), sound toggle, **"Skip game / Recruiter mode" switch** (§5.5). Expandable drawer lists achievements (locked ones show silhouette + hint text).

### 5.3 Achievements (12 total, each = id, name, icon, hint, xp)
`FIRST_CONTACT` (arrived), `SCROLL_MASTER` (reached footer), `DEEP_DIVER` (read a full case study), `SKILL_SCANNER` (skills interaction), `AI_WHISPERER` (chatted with the bot), `SPEED_READER` (visited all main sections in one session), `NIGHT_OWL`/`EARLY_BIRD` (visit by local time), `KONAMI_CODE`, `TERMINAL_HACKER`, `PIXEL_HUNTER` (clicked hidden pixel), `HEADHUNTER` (downloaded resume + clicked contact — the "true ending").
Unlock UI: gold toast slides in with icon flip animation + `canvas-confetti` micro-burst.

### 5.4 Easter eggs
1. **Konami code** (`↑↑↓↓←→←→BA`) → retro CRT filter over the site for 10s + achievement.
2. **Hidden terminal:** press `~` or click a tiny blinking cursor in the footer → fake terminal modal supporting `help`, `whoami`, `skills`, `projects`, `contact`, `sudo hire-me` (prints a fun offer-letter ASCII + opens mailto), `clear`, `exit`.
3. **Pixel hunter:** one 6px glowing pixel hidden in the projects section.

### 5.5 Recruiter mode (mandatory escape hatch)
A prominent switch in HUD + hero ("⏩ In a hurry? Recruiter mode"). When ON: disables particles/parallax/scroll scenes/XP toasts, renders the same content in a clean single-column professional layout with a sticky "Download Resume" button. Persisted. **This mode must be fully functional and beautiful — it is the accessibility & business fallback, not an afterthought.**

---

## 6. Information Architecture & Page-by-Page Requirements

Single-page app feel; routes: `/` (main scroll narrative), `/projects/[slug]` (case studies), `/blog` (coming-soon quest board), plus `/api/chat`.

### 6.1 Loading / intro (first visit only)
"Player loading" screen ≤ 1.5s: logo monogram draws in (SVG stroke animation), progress bar labeled "Loading Product Owner… assembling backlog…". Skippable by click; never shown again in the session.

### 6.2 Hero — "Character Select"
- Left: `{{OWNER_NAME}}` as a **character card**: photo/avatar with animated neon ring, name plate, class = `{{OWNER_TITLE}}` ("Class: Senior Product Owner"), animated stat bars (e.g., Strategy / Discovery / Delivery / Stakeholder-Whispering — values from `{{OLD_SITE}}` skills), and rotating typewriter tagline cycling 3–4 lines derived from the old site's headline.
- Right/background: lazy-loaded R3F accent (floating low-poly product artifacts: kanban card, lightbulb, rocket — slow orbit, mouse parallax). Static SVG fallback on mobile/reduced-motion.
- CTAs: **"▶ Start the tour"** (smooth-scrolls + starts XP), **"Recruiter mode"**, **"Talk to my AI"** (opens chat).
- Scroll cue: bouncing "scroll to begin quest" chevron.

### 6.3 Skills — "Skill Tree"
- Skills from `{{OLD_SITE}}` grouped into 3–4 branches (e.g., Product Strategy / Agile Delivery / AI & Data / Leadership) rendered as a **skill-tree graph** (SVG nodes + connecting lines that draw in on scroll).
- Click a node → radial detail popover: proficiency ring animates, years, related projects chips.
- Mini-interaction for `SKILL_SCANNER`: "Scan all branches" — clicking at least one node in each branch fills a scanner meter → XP + achievement.
- Mobile: horizontal snap-scroll branch cards instead of graph.

### 6.4 Experience — "Campaign Timeline"
- Vertical timeline of roles from `{{OLD_SITE}}`, styled as **game levels** ("Level 4: {{Company}} — {{Years}}").
- GSAP ScrollTrigger: a glowing progress line draws down as you scroll; each entry card flips/slides in; key metrics count up (`+38% adoption` style — only real numbers from the old site).
- Each entry: role, company, dates, 3 bullet outcomes, tech/method chips.

### 6.5 Projects — "Quest Log"
- Grid of case-study cards styled as quest cards: difficulty stars, "quest type" tag (0→1, Growth, Platform, AI…), outcome badge, hover tilt (3D perspective) + glow.
- Card click → `/projects/[slug]` case study page: hero banner, **Problem → Players (stakeholders) → Strategy → Execution → Boss fight (biggest challenge) → Loot (outcomes/metrics)** narrative structure, next/prev quest navigation. Content from `{{PROJECTS[]}}`; keep the old site's real substance, re-frame headings only.

### 6.6 AI section — "The AI Copilot" (see §7)
Embedded chat panel introduced with a short animated pitch: "Don't feel like scrolling? Interrogate my AI twin."

### 6.7 Testimonials — "Party Reviews" (if old site has them)
Carousel of quote cards styled as in-game reviews with ⭐ ratings, auto-play with pause-on-hover.

### 6.8 Contact — "Join My Party"
- Big energetic finale: "Ready to ship great products together?"
- Buttons: Email (mailto), LinkedIn, `{{SOCIALS[]}}`, **Download Resume** (`{{RESUME_PDF}}`, triggers `HEADHUNTER` logic).
- Optional form → `mailto:` compose fallback only (no backend).
- Footer: mini sitemap, hidden terminal cursor, "Built with 🤖 + ☕ — press ~ if you're curious", theme + sound toggles, achievement count.

---

## 7. AI Assistant ("AI Twin") — functional spec

**Purpose:** answer visitor questions about the owner using ONLY the migrated site content.

- **UI:** floating action button (pulsing bot icon) → slide-up chat panel. Streaming responses, typing indicator, 3 suggested starter chips ("What's their biggest product win?", "How do they run discovery?", "Are they open to new roles?").
- **Backend:** single Next.js route `/api/chat` using Vercel AI SDK → Anthropic `claude-haiku-4-5-20251001`, `max_tokens: 600`. System prompt embeds a compact JSON knowledge pack generated at build time from `/src/content` and instructs: first-person-adjacent voice ("I'm {{OWNER_NAME}}'s AI twin"), refuse to invent facts, redirect off-topic questions playfully, always offer contact CTA when hiring intent is detected.
- **Rate limit:** 20 messages/session client-side + simple IP throttle in the route.
- **No-API-key fallback (must work):** if `ANTHROPIC_API_KEY` is absent at build/runtime, the panel becomes a **scripted FAQ bot** — fuzzy-matches question keywords against ~15 canned Q&A pairs generated from content files, same chat UI. The site must never show a broken chat.
- Award `AI_WHISPERER` on first sent message.

---

## 8. Animation Inventory (implementation checklist)

| # | Element | Tech | Notes |
|---|---|---|---|
| 1 | Intro loader logo draw | SVG stroke + FM | ≤1.5s, skippable |
| 2 | Starfield/grid parallax bg | Canvas, rAF | ≤ 200 particles, pause when tab hidden |
| 3 | Hero stat bars fill | FM spring | on mount |
| 4 | Typewriter tagline | custom hook | 4s cycle |
| 5 | 3D hero accent | R3F lazy | dynamic import, `<Suspense>` fallback = static SVG |
| 6 | Section reveal | FM `whileInView` | once: true, stagger children |
| 7 | Skill tree line drawing | SVG `pathLength` + FM | scroll-linked |
| 8 | Timeline progress line + count-ups | GSAP ScrollTrigger | scrub |
| 9 | Quest card hover tilt | FM + transform perspective | disable on touch |
| 10 | XP bar fill + level-up | FM layout + confetti | HUD |
| 11 | Achievement toast | FM AnimatePresence | queue, max 1 visible |
| 12 | Konami CRT filter | CSS filter class | 10s timer |
| 13 | Terminal modal | FM scale/fade | focus-trapped |
| 14 | Page transitions | FM AnimatePresence on routes | 250ms |

**Global rule:** all of the above degrade to opacity-only fades under `prefers-reduced-motion` or Recruiter mode; items 2, 5, 8, 9, 12 unmount entirely.

---

## 9. Content Migration Rules

1. Crawl/read `{{OLD_SITE}}`; extract into typed files: `content/profile.ts`, `content/skills.ts`, `content/experience.ts`, `content/projects/*.mdx`, `content/testimonials.ts`, `content/socials.ts`.
2. Preserve every factual claim (dates, companies, metrics, certifications) exactly.
3. Rewrite headings/microcopy into the §4 tone; keep body copy professional.
4. Every image: migrate, convert to WebP/AVIF via `next/image`, write real alt text.
5. Set up 301-style redirects (Next `redirects()`) from old site URL paths to new routes.
6. If any expected content is missing from the old site, render nothing (never lorem ipsum) and log it in `MIGRATION_NOTES.md`.

---

## 10. Accessibility (WCAG 2.2 AA — hard requirements)

- Full keyboard operability incl. skill tree (arrow-key node navigation), terminal, chat, HUD.
- Visible focus rings (neon outline, 2px offset), skip-to-content link.
- All game feedback also announced via `aria-live="polite"` region ("Achievement unlocked: …").
- Color contrast ≥ 4.5:1 for text in both themes (verify neon-on-dark values).
- Sound strictly opt-in; no autoplaying audio ever.
- Reduced-motion behavior per §4/§8.
- Recruiter mode doubles as low-stimulation mode; label it "Recruiter / focus mode".

---

## 11. Performance Budgets (CI-enforced via Lighthouse CI)

- Lighthouse (mobile, throttled): **Performance ≥ 85, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95**.
- LCP < 2.5s, CLS < 0.05, INP < 200ms.
- Initial JS ≤ 180KB gzip; R3F, GSAP, Lottie, confetti all lazy/dynamic-imported.
- Fonts: 2 families max, `display: swap`, subset.
- Particle canvas capped at 60fps with `requestAnimationFrame`; suspend on `visibilitychange`.

---

## 12. SEO & Meta

- Per-route metadata; OG image = auto-generated "character card" (Next OG image route) showing name, title, level badge.
- JSON-LD: `Person` (+ `sameAs` from socials) on `/`, `Article`-style on case studies.
- Semantic landmarks (`header/main/section/footer`, h1 once per page), sitemap.xml, robots.txt.
- The gamified layer must not hide content from crawlers — all copy rendered in HTML (RSC), animations are presentation-only.

---

## 13. Acceptance Criteria & Test Plan

Playwright must cover:
1. **Cold visit flow:** loader → hero → scroll all sections → XP increases, `SCROLL_MASTER` unlocks, state persists after reload.
2. **Recruiter mode:** toggle on → animations gone, single-column layout, resume downloadable, toggle persists.
3. **AI chat:** with no API key configured, fallback FAQ bot answers a canned question; suggested chips work.
4. **Easter eggs:** Konami code applies CRT class; `~` opens terminal; `sudo hire-me` prints and opens mailto.
5. **A11y smoke:** axe-core on `/` and one case study reports 0 critical violations in both themes.

Manual checklist: reduced-motion pass, 375px/768px/1440px layouts, keyboard-only full tour, localStorage-disabled graceful degradation (game silently off, site fine).

**Definition of Done:** all budgets in §11 pass in CI, all 12 achievements reachable, `MIGRATION_NOTES.md` lists any content gaps, README documents env vars (`ANTHROPIC_API_KEY` optional) and deploy steps.

---

## 14. Build Order (suggested milestones)

1. **M1 – Skeleton & content:** Next.js scaffold, theming, typed content files migrated from `{{OLD_SITE}}`, plain sections, Recruiter-mode layout (this IS the fallback site).
2. **M2 – Game engine:** Zustand store, XP rules, HUD, achievements, toasts, persistence.
3. **M3 – Signature interactions:** hero character card, skill tree, quest log, timeline scroll scene.
4. **M4 – AI twin:** chat UI, `/api/chat`, knowledge pack build step, FAQ fallback.
5. **M5 – Delight & polish:** easter eggs, terminal, 3D accent, confetti/sound, OG images.
6. **M6 – Hardening:** a11y pass, perf budgets, Playwright suite, redirects, deploy.

**Only blockers worth stopping for:** missing `{{OLD_SITE}}` access, or missing resume PDF. Everything else: follow this spec and record judgment calls in `DECISIONS.md`.
