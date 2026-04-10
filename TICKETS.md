# Website Enhancement Tickets

## 🎯 High Priority

### TICKET-018: Portfolio Case Studies

**Status**: Backlog
**Priority**: High
**Effort**: 6-8 hours
**Description**: Replace generic portfolio blurbs with real case studies showing client, problem, tech, and outcome
**Acceptance Criteria**:

- [ ] Write 3-4 case studies with problem, solution, outcome, and role
- [ ] Add to /work page or create individual case study pages
- [ ] Include metrics where possible (time saved, performance gains, etc.)
- [ ] Include client industry and project size context

**Candidate projects** (from Holocron allocation history):

- iCapital: Integrated Offerings (2024–present) — fintech, most recent
- Healthcasts (2022–2024) — ~18 month engagement
- Angi: Partner Automations (2021–2022) — well-known brand, multiple projects
- Shell: DINGO (2018–2019) — enterprise, ~13 months

**Working notes**: `/Users/adam/portfolio-case-studies.md`
**Data source**: `/Users/adam/repos/mojo-holocron/db/mojo_holocron_dev.db` → `project_allocations`

**Notes**: #1 priority for job search. Recognizable company names with real outcomes are the strongest signal for technical evaluators. Merged from TICKET-003.

---

### TICKET-059: Contact Form Silent Email Failure

**Status**: Backlog
**Priority**: High
**Effort**: 1 hour
**Description**: The contact API swallows Resend failures and returns HTTP 200 regardless. Users see a success message even if their message was never delivered. There is no fallback or notification channel.
**Acceptance Criteria**:

- [ ] Surface Resend errors to the client with a distinct failure message ("Message sent to backup — we'll follow up shortly")
- [ ] Or: log failed submissions to Upstash Redis for manual review
- [ ] Do not silently discard form data on transient Resend errors

**Notes**: Upgraded from Medium — a hiring manager or recruiter submitting the contact form and never getting a response is a high-cost failure.

**File**: `src/routes/api/contact/+server.ts`

---

### TICKET-042: Client Logo Showcase

**Status**: Backlog
**Priority**: High
**Effort**: 2-3 hours
**Description**: Display logos of companies worked with (permission-based) — iCapital, Shell, Angi are strong credibility signals for technical evaluators
**Acceptance Criteria**:

- [ ] For each company: obtain explicit written permission before displaying their logo (logos are trademarked — displaying without permission risks infringement even in a portfolio context)
- [ ] If permission is granted: add "Trusted by" / "Where I've worked" section on homepage with logos
- [ ] If permission is not granted: fall back to plain-text company names (achieves most of the same credibility signal without legal risk)
- [ ] Link to case studies where available

**Notes**: Upgraded from Medium — recognizable company names are a key trust signal for hiring managers. Logo use requires permission; plain-text name-dropping in case studies (TICKET-018) is the safe default in the meantime.

---

### TICKET-015: Social Proof & Testimonials

**Status**: Backlog
**Priority**: High
**Effort**: 3-4 hours
**Description**: Add testimonials, LinkedIn recommendations, and trust signals throughout the site
**Acceptance Criteria**:

- [ ] Create testimonials component with LinkedIn recommendations and client quotes (3-5 entries, names and companies)
- [ ] Add client logo section on homepage (coordinate with TICKET-042)
- [ ] Add testimonials near contact form on contact page
- [ ] Schema markup for review snippets

**Notes**: Prioritize LinkedIn recommendations over generic quotes — they're verifiable and carry more weight with technical evaluators. Merged from TICKET-001.

---

### TICKET-021: Trust Indicators & Credentials

**Status**: Backlog
**Priority**: High
**Effort**: 2-3 hours
**Description**: Add professional credentials and technical trust signals for a hiring-manager audience
**Acceptance Criteria**:

- [ ] Add years of experience and projects completed count
- [ ] Show GitHub activity or tech stack expertise visually
- [ ] Include professional headshot and personal story
- [ ] Highlight open source contributions or public technical work if available

**Notes**: Upgraded from Medium — GitHub activity and visible technical depth are exactly what engineers and hiring managers scan for. Removed "Licensed & Insured" criterion (freelance-only signal).

---

## 📈 Medium Priority

### TICKET-069: Terminal Easter Egg

**Status**: Backlog
**Priority**: Medium
**Effort**: 4-6 hours
**Description**: Hidden terminal drawer that activates when a visitor starts typing on any page. Supports commands like `whoami`, `help`, `ls`. Rewards curious engineers. Design spec in `tickets/TICKET-019-terminal-easter-egg.md`. Implement Option A (keydown → drawer) + Option C (`/terminal` route) using the same component.
**Acceptance Criteria**:

- [ ] Terminal drawer component: dark bg, teal prompt, monospace font
- [ ] Commands: `whoami`, `help`, `ls`, `ls /work`, `ls /stack`, `clear`, `exit`
- [ ] Keydown listener on `window` activates drawer — skips inputs, textareas, contenteditables, meta/ctrl combos
- [ ] `Escape` or `exit` dismisses the drawer
- [ ] `/terminal` route renders the same component full-screen (shareable, linkable)
- [ ] FAB suppressed while drawer is open on mobile
- [ ] Drawer slides up from bottom, covers ~50% of viewport

---

### TICKET-070: Stack Tag Filter on /work

**Status**: Backlog
**Priority**: Medium
**Effort**: 1-2 hours
**Description**: Click a tech stack tag to filter the project list to entries using that technology. Feels like a real dev tool — useful and interactive without being decorative.
**Acceptance Criteria**:

- [ ] Clicking a stack tag filters visible project cards to those using that tech
- [ ] Active filter tag highlighted in teal
- [ ] Clicking the active tag clears the filter
- [ ] Smooth — no page reload, no layout shift
- [ ] Works on `/work` (full list); home page preview is out of scope

---

### TICKET-009: Analytics & Conversion Tracking

**Status**: Backlog
**Priority**: Medium
**Effort**: 2 hours
**Description**: Set up detailed conversion funnel analytics beyond Vercel's built-in
**Acceptance Criteria**:

- [ ] Contact form submission tracking
- [ ] CTA click tracking
- [ ] Page scroll depth tracking

**Notes**: Already have Vercel analytics, need more granular conversion data.

---

### TICKET-024: Blog Content Strategy

**Status**: Backlog
**Priority**: Medium
**Effort**: Ongoing
**Description**: Create technical content that demonstrates engineering depth and judgment to a hiring-manager audience
**Acceptance Criteria**:

- [ ] At least 2 technical deep-dives tied to real project work (e.g. architecture decisions, scaling lessons, tradeoffs made)
- [ ] Posts that showcase technical judgment, not just skill
- [ ] At least 1 post on a topic relevant to the target companies/stack
- [ ] Consistent publishing cadence

**Notes**: Reframed from small-business pain points to technical writing. Blog is already the strongest job-search asset on the site — lean into it. Merged from TICKET-006.

---

### TICKET-058: Goodreads Cache Persistence Across Cold Starts

**Status**: Backlog
**Priority**: Medium
**Effort**: 1-2 hours
**Description**: `goodreadsService.ts` uses an in-memory cache with a 1-hour TTL. Vercel serverless cold starts reset this cache, causing frequent RSS fetches and added latency on the first request after inactivity.
**Acceptance Criteria**:

- [ ] Move Goodreads cache to Upstash Redis (client already wired for contact rate-limiting)
- [ ] Store serialized shelf JSON with a 1-hour TTL key per shelf
- [ ] Fall back to live RSS fetch on Redis miss or error

**File**: `src/lib/server/goodreadsService.ts`

---

### TICKET-062: Extract WorkCard Component — Duplicated Across Home and Work Pages

**Status**: Backlog
**Priority**: Medium
**Effort**: 1-2 hours
**Description**: The work/project card markup is copy-pasted between `/` and `/work`. Both render the same `selectedWork` data with near-identical structure (header, stack tags, outcome) but subtly different class names and margin values, meaning they'll drift over time.
**Acceptance Criteria**:

- [ ] Create `src/components/work-card.svelte` accepting a work item prop
- [ ] Support a `variant?: 'preview' | 'full'` prop for the layout differences between pages
- [ ] Replace the inline markup in `+page.svelte` and `work/+page.svelte` with `<WorkCard>`
- [ ] Shared styles moved to component `<style>` block or `app.css`

**Files**: `src/routes/+page.svelte`, `src/routes/work/+page.svelte`

---

### TICKET-063: Move Repeated Section Styles to app.css

**Status**: Backlog
**Priority**: Medium
**Effort**: 1 hour
**Description**: `.section-border`, `.section-heading`, and `.accent-dot` are redefined in `<style>` blocks on multiple page components with minor variations (e.g. `margin-bottom: 24px` vs `20px`). They should be single global utilities.
**Acceptance Criteria**:

- [ ] Consolidate `.section-border`, `.section-heading`, `.accent-dot` into `app.css`
- [ ] Remove per-page redefinitions; use the global classes directly
- [ ] Resolve any margin/spacing differences by picking one canonical value or making it a CSS var

**Files**: `src/routes/+page.svelte`, `src/routes/hire/+page.svelte`, `src/app.css`

---

### TICKET-064: Fix Hardcoded Code Block Colors in Blog Post — Theme-Unaware

**Status**: Backlog
**Priority**: Medium
**Effort**: 30 min
**Description**: Prose code block styles in the blog post page use hardcoded hex values (`#111111`, `#e8e8e8`, `#1a1a1a`) instead of CSS custom properties. These always render dark regardless of the active theme.
**Acceptance Criteria**:

- [ ] Add `--color-code-bg`, `--color-code-text`, `--color-code-border` to the `:root` / `[data-theme='dark']` blocks in `app.css`
- [ ] Replace hardcoded hex values in `blog/[...slug]/+page.svelte` prose styles with the new vars
- [ ] Light theme should have a legible light-mode code style; dark theme keeps existing dark style

**File**: `src/routes/blog/[...slug]/+page.svelte`

---

## 🔧 Low Priority

### TICKET-071: Copy-on-Click Contact Details

**Status**: Backlog
**Priority**: Low
**Effort**: 30 min
**Description**: Email and GitHub handle in the footer copy to clipboard on click with a brief "copied!" flash. Standard engineer UX — small but noticed.
**Acceptance Criteria**:

- [ ] Click email → copies address, shows inline "copied!" for 1.5s
- [ ] Click GitHub link → copies URL, shows inline "copied!" for 1.5s
- [ ] Uses `navigator.clipboard` API with a graceful no-op fallback
- [ ] No layout shift from the feedback state

**File**: `src/components/footer.svelte`

---

### TICKET-072: Konami Code Easter Egg

**Status**: Backlog
**Priority**: Low
**Effort**: 1-2 hours
**Description**: ↑↑↓↓←→←→BA triggers something. Options: navigate to `/terminal`, flash a brief glitch effect, or display a hidden message. Must not conflict with the terminal keydown listener (TICKET-069).
**Acceptance Criteria**:

- [ ] Konami sequence detected via `keydown` listener
- [ ] On success: navigate to `/terminal` or trigger a brief visual effect
- [ ] Sequence detection resets on any non-sequence key
- [ ] Coexists cleanly with TICKET-069 keydown listener

---

### TICKET-073: git log-Style Work Timeline

**Status**: Backlog
**Priority**: Low
**Effort**: 2-3 hours
**Description**: Render the work history as a fake `git log --oneline` — short SHAs, branch refs, commit-style one-liners. Signals engineering identity without explaining it.
**Acceptance Criteria**:

- [ ] Timeline section on `/work` (or a separate `/log` route)
- [ ] Deterministic fake short SHA per entry (not random on each render)
- [ ] Branch-ref labels: `HEAD → main` for current role, named branches for past ones
- [ ] Mono font, muted SHA + date, teal branch refs
- [ ] Each entry links to its case study if one exists

---

### TICKET-074: Live Clock in Footer

**Status**: Done
**Priority**: Low
**Effort**: 30 min
**Description**: Subtle live clock showing current New York time — `New York · 14:23:07` in mono. Ticking every second. Demonstrates the page is alive without adding noise.
**Acceptance Criteria**:

- [ ] Updates every second via `setInterval` in `onMount`
- [ ] Interval cleared in `onDestroy`
- [ ] Shows timezone label alongside time
- [ ] Mono font, muted color
- [ ] SSR-safe (initial value set client-side to avoid hydration mismatch)

**File**: `src/components/footer.svelte`

---

### TICKET-002: Google Business Profile Setup

**Status**: Deferred
**Priority**: Low
**Effort**: 1 hour
**Description**: Create and optimize Google Business Profile for local visibility
**Acceptance Criteria**:

- [ ] Create Google Business Profile for "Adam Robinson - Freelance Developer"
- [ ] Add business hours, services, location (Cranston, RI)
- [ ] Upload professional photos
- [ ] Optimize description for local software development keywords
- [ ] Get initial reviews from past clients

**Notes**: Useful for freelance side work, but not a priority while job searching. Revisit if freelance pipeline needs a boost.

---

### TICKET-014: Rhode Island Landing Pages

**Status**: Deferred
**Priority**: Low
**Effort**: 3-4 hours
**Description**: Create location-specific landing pages for broader local SEO
**Acceptance Criteria**:

- [ ] "Software Developer Providence RI" page
- [ ] "Web Developer Warwick RI" page
- [ ] City-specific content and keywords
- [ ] Local business schema markup per page

**Notes**: Deferred — local freelance SEO, not relevant to job search.

---

### TICKET-019: Local SEO Foundation

**Status**: Deferred
**Priority**: Low
**Effort**: 3-4 hours
**Description**: Submit to local business directories and optimize for "near me" searches
**Acceptance Criteria**:

- [ ] Cranston Chamber of Commerce listing
- [ ] Rhode Island business directories
- [ ] Yelp business listing
- [ ] Optimize for "software developer near me" queries

**Notes**: Deferred — local freelance SEO, not relevant to job search. Merged from TICKET-007.

---

### TICKET-022: Consultation Booking System

**Status**: Backlog
**Priority**: Low
**Effort**: 3-4 hours
**Description**: Reduce friction for initial consultations with calendar booking
**Acceptance Criteria**:

- [ ] Integrate Calendly or similar
- [ ] Add "Book Free Consultation" CTAs throughout site
- [ ] Automated confirmation and reminder emails
- [ ] Include pre-consultation questionnaire

**Notes**: More useful for freelance than job search — job leads come through email and LinkedIn. Merged from TICKET-004.

---

### TICKET-025: Referral Program

**Status**: Deferred
**Priority**: Low
**Effort**: 2-3 hours
**Description**: Systematize word-of-mouth referrals
**Acceptance Criteria**:

- [ ] Add referral program page with incentives explained
- [ ] "Refer a Business" CTA in post-project communications
- [ ] Referral incentives (discount or cash)

**Notes**: Deferred — freelance-only. Small businesses trust referrals above all other marketing.

---

### TICKET-031: Mini Case Study Examples in Services

**Status**: Backlog
**Priority**: Low
**Effort**: 2-3 hours
**Description**: Add problem/solution/result snippets to each service card
**Acceptance Criteria**:

- [ ] 1-2 mini examples per service type
- [ ] Format: "Problem → Solution → Result" with a metric

**Notes**: Lower priority now that TICKET-018 (full case studies) is the focus.

---

### TICKET-036: Exit Intent Lead Capture

**Status**: Deferred
**Priority**: Low
**Effort**: 2-3 hours
**Description**: Capture visitors leaving without taking action
**Acceptance Criteria**:

- [ ] Exit intent detection (desktop mouse movement, mobile scroll)
- [ ] Offer free consultation or resource download
- [ ] Easy dismiss with "don't show again" behavior
- [ ] Respect user experience — not immediate on load

**Notes**: Deferred — pure freelance conversion tactic. A popup like this would feel out of place to a hiring manager.

---

### TICKET-040: Lead Magnets & Free Resource Downloads

**Status**: Deferred
**Priority**: Low
**Effort**: 4-6 hours
**Description**: Create downloadable resources to capture leads not ready to contact yet
**Acceptance Criteria**:

- [ ] "Small Business Software Planning Checklist" PDF
- [ ] "Website Health Check Template"
- [ ] "Questions to Ask Before Hiring a Developer"
- [ ] Landing pages with email capture for each
- [ ] Email delivery automation

**Notes**: Deferred — entirely freelance/small-business audience. Wrong signal for hiring managers. Merged from TICKET-013 and TICKET-020.

---

### TICKET-041: Live Chat Widget

**Status**: Backlog
**Priority**: Low
**Effort**: 2-3 hours
**Description**: Handle immediate questions and show accessibility
**Acceptance Criteria**:

- [ ] Automated responses for common questions
- [ ] Business hours display
- [ ] Email fallback for offline messages

**Notes**: Freelance sales tool — not relevant for job search.

---

### TICKET-046: Social Proof Aggregation Page

**Status**: Backlog
**Priority**: Low
**Effort**: 4-5 hours
**Description**: Dedicated testimonials/reviews page for prospects who need extensive validation
**Acceptance Criteria**:

- [ ] Aggregate Google reviews, LinkedIn recommendations
- [ ] Filter by industry or project type
- [ ] Schema markup for SEO

**Notes**: Do TICKET-015 first; this is the extended version.

---

### TICKET-047: Interactive Project Estimation Tool

**Status**: Deferred
**Priority**: Low
**Effort**: 6-8 hours
**Description**: Multi-step questionnaire that gives ballpark estimates and captures leads
**Acceptance Criteria**:

- [ ] Project type, complexity, timeline inputs
- [ ] Ballpark pricing shown after email capture
- [ ] Follow-up email automation for estimate recipients
- [ ] Disclaimer about estimate vs. final pricing

**Notes**: Deferred — freelance lead-gen only, significant effort. Merged from TICKET-005 and TICKET-035.

---

### TICKET-049: Fix Draft Blog Post Routing

**Status**: Done
**Priority**: Low
**Effort**: 30 min
**Description**: `getAllPosts(true)` returns draft posts with slugs prefixed `drafts/foo`. These render as links on the `/blog` listing page in dev, but `blog/[slug]` is a single-segment route — SvelteKit won't match `/blog/drafts/foo`, so clicking them 404s.
**Acceptance Criteria**:

- [ ] Add a `src/routes/blog/drafts/[slug]/+page.server.ts` route that loads draft posts (dev-only), OR
- [ ] Change `blog/[slug]` to `blog/[...slug]` and update `+page.server.ts` to join the segments back into a path
- [ ] Draft links on the blog listing page navigate correctly in dev

**Files**: `src/lib/server/blog.ts:33`, `src/routes/blog/[slug]/+page.server.ts`

---

### TICKET-050: Fix Schema Markup Inconsistencies in app.html

**Status**: Done
**Priority**: Low
**Effort**: 15 min
**Description**: The `Person` structured data in `app.html` describes a "Lead Software Engineer building backend systems" in "Providence, RI" — conflicting with the site's freelance-consultant persona and the "Cranston, RI" used everywhere else.
**Acceptance Criteria**:

- [ ] Update `jobTitle` and `description` to match the freelance consultant persona (aligned with `seo-head.svelte` `LocalBusiness` schema)
- [ ] Change `addressLocality` from `"Providence"` to `"Cranston"`

**File**: `src/app.html:28-37`

---

### TICKET-051: Remove Dead Code (email-templates.ts, api-utils.ts)

**Status**: Done (email-templates.ts deleted; api-utils.ts is NOT dead — used by goodreads routes)
**Priority**: Low
**Effort**: 15 min
**Description**: Two library files export functions that are never imported or called anywhere. `email-templates.ts` also defines a `ContactFormData` interface that diverges from the one in `validation.ts` (missing `project` field), creating a maintenance hazard.
**Acceptance Criteria**:

- [ ] Delete `src/lib/email-templates.ts` (or wire it up if intended to replace inline email HTML in `+server.ts`)
- [ ] Delete `src/lib/server/api-utils.ts` (or wire it up in the goodreads/sitemap routes)
- [ ] Ensure build still passes after deletion

**Files**: `src/lib/email-templates.ts`, `src/lib/server/api-utils.ts`

---

### TICKET-052: Harden Goodreads Service

**Status**: Done
**Priority**: Low
**Effort**: 30 min
**Description**: Three small reliability gaps in `goodreadsService.ts`: silent error swallowing with no logging, `parseInt(bookId)` can produce `NaN` for empty strings, and the pagination loop has no max-page guard.
**Acceptance Criteria**:

- [ ] Add `console.error` in the `getBooksFromShelf` catch block before returning `[]`
- [ ] Guard `parseInt(bookId)` against `NaN` (e.g. `parseInt(bookId) || 0`)
- [ ] Add a max-page limit (e.g. `page > 20`) to the pagination `while(true)` loop

**File**: `src/lib/server/goodreadsService.ts`

---

### TICKET-054: Fix sanitizeContactForm Dropping project Field

**Status**: Done
**Priority**: Low
**Effort**: 15 min
**Description**: `sanitizeContactForm` in `validation.ts` returns an object that omits the `project` field. It isn't called server-side today (the contact API has its own sanitization), but if it ever is, `project` silently disappears from the submission.
**Acceptance Criteria**:

- [ ] Add `project: data.project ? sanitizeInput(data.project) : undefined` to the return value in `sanitizeContactForm`
- [ ] Verify all fields round-trip correctly through the function

**File**: `src/lib/validation.ts:65-73`

---

### TICKET-055: Consolidate Email Validation — Remove Duplicate Regex

**Status**: Done
**Priority**: Low
**Effort**: 15 min
**Description**: The contact API (`+server.ts:58-61`) duplicates the email regex instead of importing `validateEmail` from `$lib/validation`. Two copies of validation logic will drift over time.
**Acceptance Criteria**:

- [ ] Import `validateEmail` from `$lib/validation` in `src/routes/api/contact/+server.ts`
- [ ] Replace the inline `emailRegex` + `test` call with `validateEmail(data.email)`
- [ ] Remove the now-unused inline regex

**File**: `src/routes/api/contact/+server.ts:58-61`

---

### TICKET-056: Consolidate Duplicate ContactFormData Type

**Status**: Done (email-templates.ts deleted per TICKET-051; validation.ts is the single source of truth)
**Priority**: Low
**Effort**: 15 min
**Description**: `ContactFormData` is defined independently in both `validation.ts` and `email-templates.ts`. The two definitions diverge — `email-templates.ts` is missing the `project` field. One authoritative definition should be exported and re-used.
**Acceptance Criteria**:

- [ ] Keep `ContactFormData` in `validation.ts` as the single source of truth
- [ ] Update `email-templates.ts` to import from `$lib/validation` (or delete the file per TICKET-051)
- [ ] Ensure the contact API imports the type from `$lib/validation` only

**Files**: `src/lib/validation.ts:8-16`, `src/lib/email-templates.ts:3-9`

---

### TICKET-057: Harden Contact API Input Handling

**Status**: Done
**Priority**: Low
**Effort**: 30 min
**Description**: Two small gaps in the contact API's request handling:

1. No `Content-Type` check — a non-JSON body causes `request.json()` to throw, returning a 500 instead of a 400.
2. The IP address logged in the notification email (`x-forwarded-for` header, line 97) may differ from the IP used for rate limiting (`getClientAddress()`, line 37), making submissions hard to correlate in logs.
   **Acceptance Criteria**:

- [ ] Check `request.headers.get('content-type')` before parsing; return 400 if not `application/json`
- [ ] Capture `clientIP` before the try block and reuse it in the email body instead of re-reading `x-forwarded-for`

**File**: `src/routes/api/contact/+server.ts`

---

### TICKET-060: Blog Draft Filtering Is Dev-Mode-Only, Not Build-Mode-Aware

**Status**: Backlog
**Priority**: Low
**Effort**: 30 min
**Description**: `getAllPosts(dev)` gates draft visibility on SvelteKit's `dev` flag. Vercel preview deployments run in production mode (`dev === false`), so drafts are invisible there too — no way to preview a draft before publishing without running locally.
**Acceptance Criteria**:

- [ ] Add a `SHOW_DRAFTS` env var that can be set on the Vercel preview environment
- [ ] Pass `dev || !!SHOW_DRAFTS` to `getAllPosts` in the blog load function
- [ ] Document in CLAUDE.md that preview drafts require `SHOW_DRAFTS=true` on the Vercel project

**File**: `src/lib/server/blog.ts`, `src/routes/blog/+page.server.ts`

---

### TICKET-061: Add PageData Types to Load Functions

**Status**: Backlog
**Priority**: Low
**Effort**: 1 hour
**Description**: `app.d.ts` is minimal and load function return types rely entirely on inference. Explicit `PageData` types catch shape mismatches between `+page.server.ts` and `+page.svelte` at compile time rather than at runtime.
**Acceptance Criteria**:

- [ ] Define typed return shapes for blog index, blog post, and any other load functions with non-trivial data
- [ ] Use SvelteKit's generated `PageData` type pattern or explicit `Load` return types
- [ ] Confirm `npm run check` passes with no new type errors

**Files**: `src/app.d.ts`, `src/routes/blog/+page.server.ts`, `src/routes/blog/[...slug]/+page.server.ts`

---

### TICKET-065: Type window.va Vercel Analytics — Repeated Unsafe Cast

**Status**: Backlog
**Priority**: Low
**Effort**: 15 min
**Description**: `contact-form.svelte` casts `window` to an inline anonymous type twice to access `window.va`. The type assertion is fragile and duplicated.
**Acceptance Criteria**:

- [ ] Add a `Window` interface augmentation to `src/app.d.ts` declaring `va?: { track: (event: string, params?: Record<string, string>) => void }`
- [ ] Remove both inline type casts from `contact-form.svelte`

**Files**: `src/app.d.ts`, `src/components/contact-form.svelte`

---

### TICKET-066: Unify IntersectionObserver Pattern — animations.ts vs Blog Post

**Status**: Backlog
**Priority**: Low
**Effort**: 30 min
**Description**: Two separate IntersectionObserver implementations exist with different class names (`animate-in` vs `animated`) and different threshold/rootMargin values. The blog post page creates its own observer instead of using the utility in `animations.ts`.
**Acceptance Criteria**:

- [ ] Extend `animations.ts` with a configurable `createElementObserver(options)` factory (threshold, rootMargin, className all optional with sensible defaults)
- [ ] Replace the inline observer in `blog/[...slug]/+page.svelte` with the factory
- [ ] Confirm both use cases still animate correctly

**Files**: `src/lib/animations.ts`, `src/routes/blog/[...slug]/+page.svelte`

---

### TICKET-067: Extract TechStack Component — Two Different Renderings of Same Data

**Status**: Backlog
**Priority**: Low
**Effort**: 1 hour
**Description**: `techStack` from `$lib/copy.ts` is rendered as an interactive button grid on the home page and as comma-separated text on the hire page. Two different presentations of the same data, no shared component.
**Acceptance Criteria**:

- [ ] Create `src/components/tech-stack.svelte` with `variant: 'grid' | 'list'` prop
- [ ] Home page uses `variant="grid"` (existing button/badge style)
- [ ] Hire page uses `variant="list"` (existing comma-separated style)

**Files**: `src/routes/+page.svelte`, `src/routes/hire/+page.svelte`

---

### TICKET-068: Remove Unused `budget` and `phone` Fields from ContactFormData

**Status**: Backlog
**Priority**: Low
**Effort**: 15 min
**Description**: `ContactFormData` in `validation.ts` declares optional `budget` and `phone` fields. Neither appears in the contact form component or is read by the contact API. Dead type surface.
**Acceptance Criteria**:

- [ ] Confirm `budget` and `phone` are not used anywhere (grep)
- [ ] Remove them from the `ContactFormData` interface
- [ ] Verify `npm run check` passes

**File**: `src/lib/validation.ts`

---

## ✅ Completed

| Ticket     | Description                                                         | Completed                    |
| ---------- | ------------------------------------------------------------------- | ---------------------------- |
| TICKET-010 | Performance Optimization                                            | 2026-03-29                   |
| TICKET-011 | Service Icons & Visual Hierarchy                                    | 2026-03-29                   |
| TICKET-012 | Interactive Elements                                                | 2026-03-29                   |
| TICKET-016 | Conversion Form Optimization                                        | 2026-03-29                   |
| TICKET-017 | Project Budget Qualification                                        | Already live on contact form |
| TICKET-026 | Risk Reversal & Satisfaction Guarantees                             | Already live on homepage     |
| TICKET-028 | Process Transparency & Next Steps                                   | Already live on contact page |
| TICKET-029 | Concrete Business Metrics                                           | Already live in hero section |
| TICKET-030 | Speed-to-Market Positioning                                         | 2026-04-09                   |
| TICKET-033 | Technical Competency Display                                        | 2026-04-09                   |
| TICKET-037 | Sticky Mobile Contact CTA                                           | 2026-04-09                   |
| TICKET-044 | Availability & Urgency Indicators                                   | 2026-04-09                   |
| TICKET-048 | Fix Rate-Limit Race Condition in Contact API                        | 2026-04-08                   |
| TICKET-053 | Service Worker Breaking App on New Deployments                      | 2026-04-08                   |
| TICKET-049 | Fix Draft Blog Post Routing                                         | 2026-04-08                   |
| TICKET-050 | Fix Schema Markup Inconsistencies in app.html                       | 2026-04-08                   |
| TICKET-051 | Remove Dead Code (email-templates.ts deleted; api-utils.ts is used) | 2026-04-08                   |
| TICKET-052 | Harden Goodreads Service                                            | 2026-04-08                   |
| TICKET-054 | Fix sanitizeContactForm Dropping project Field                      | 2026-04-08                   |
| TICKET-055 | Consolidate Email Validation — Remove Duplicate Regex               | 2026-04-08                   |
| TICKET-056 | Consolidate Duplicate ContactFormData Type                          | 2026-04-08                   |
| TICKET-057 | Harden Contact API Input Handling                                   | 2026-04-08                   |
| TICKET-074 | Live Clock in Footer (random city, 24h)                             | 2026-04-10                   |

## ❌ Rejected

| Ticket     | Description                  | Reason                                 |
| ---------- | ---------------------------- | -------------------------------------- |
| TICKET-008 | Progressive Web App Features | No business value for a portfolio site |

---

## 📊 Summary

**Last Updated**: 2026-04-10
**Open**: 33 tickets
**Completed**: 23 | **Rejected**: 1

### Priority Breakdown

- High: 5 tickets (~15-17 hours)
- Medium: 8 tickets (~12-16 hours)
- Low: 21 tickets (mix of backlog, deferred, and done)

### Deferred (resume if freelance pipeline needs attention)
TICKET-002, TICKET-014, TICKET-019, TICKET-025, TICKET-036, TICKET-040, TICKET-047
