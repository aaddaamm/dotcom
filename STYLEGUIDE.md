# Brand Style Guide — Adam Robinson

> Last updated: March 2026

---

## Philosophy

The brand is built around one idea: **a developer who thinks clearly and builds things that last.**

The visual language borrows from the terminal and the command line — dark, precise, minimal. The prompt cursor (`▌`) is the mark. The name is the logo. Nothing decorative that doesn't earn its place.

References: Vercel, Linear, Warp, Resend.

---

## Logo

### The Mark

The logo is a **teal cursor block** paired with the name in monospace. Together they read as a terminal prompt — the cursor is waiting, the name is what was typed.

```
▌ adam robinson
```

### Variants

| File                    | Use                                 |
| ----------------------- | ----------------------------------- |
| `assets/logo-dark.svg`  | Dark backgrounds, nav bar (default) |
| `assets/logo-light.svg` | Light backgrounds                   |
| `assets/icon.svg`       | App icon, 64px+ contexts            |
| `assets/favicon.svg`    | Browser favicon, 32px               |
| `assets/og-card.svg`    | Social sharing / Open Graph         |

### Rules

- **Never** stretch, rotate, or recolor the logo
- **Never** use the logo on a busy background without a solid backing
- **Never** replace the monospace font with another typeface in the lockup
- The cursor and name must always appear together in the wordmark — do not use one without the other
- Minimum wordmark width: **240px**. Below that, use the icon mark only.

### Clear Space

Maintain clear space equal to the height of the cursor block on all sides of the logo.

---

## Color

### Palette

| Name             | Hex       | Usage                                             |
| ---------------- | --------- | ------------------------------------------------- |
| **Void**         | `#0A0A0A` | Primary background (dark mode), text (light mode) |
| **Teal**         | `#3AAFA9` | Cursor mark, accent, links (dark mode)            |
| **Teal Dark**    | `#2A7A7A` | Cursor mark, accent, links (light mode)           |
| **White**        | `#FFFFFF` | Primary text (dark mode)                          |
| **Off-white**    | `#FAFAFA` | Primary background (light mode)                   |
| **Muted**        | `#444444` | Secondary text (dark mode)                        |
| **Muted Light**  | `#AAAAAA` | Secondary text (light mode)                       |
| **Border Dark**  | `#1A1A1A` | Borders, dividers (dark mode)                     |
| **Border Light** | `#EBEBEB` | Borders, dividers (light mode)                    |
| **Grid**         | `#111111` | Subtle background grid (dark only)                |

### CSS Variables

```css
:root {
	--color-bg: #fafafa;
	--color-text: #0a0a0a;
	--color-accent: #2a7a7a;
	--color-muted: #aaaaaa;
	--color-border: #ebebeb;
}

[data-theme='dark'] {
	--color-bg: #0a0a0a;
	--color-text: #ffffff;
	--color-accent: #3aafa9;
	--color-muted: #444444;
	--color-border: #1a1a1a;
}
```

### Usage Rules

- Teal is used in **exactly two places** per view: the cursor mark and one accent element (link, label, highlight). Never scatter it.
- Backgrounds are near-black or near-white. No grays as primary backgrounds.
- The subtle grid (`#111`) can appear on dark hero sections and OG cards to add depth without decoration.

---

## Typography

### Typefaces

| Role               | Font           | Fallback                            |
| ------------------ | -------------- | ----------------------------------- |
| **Display / Logo** | JetBrains Mono | Fira Mono → Courier New → monospace |
| **Body / UI**      | Any clean sans | system-ui → sans-serif              |

The monospace font is load-bearing to the brand. It appears in: the logo wordmark, the subtitle ("LEAD SOFTWARE ENGINEER"), code blocks, and any terminal-style UI elements.

Body copy uses a clean system sans — the contrast between monospace headlines and sans body creates the right tension between technical and human.

### Scale

```
Display:  52px / 500 / tracking -1.5px  → hero name
H1:       36px / 500 / tracking -0.5px  → page titles
H2:       24px / 500 / tracking 0       → section headers
H3:       18px / 400 / tracking 0       → sub-sections
Body:     16px / 400 / line-height 1.7  → paragraphs
Small:    13px / 400 / tracking 0       → captions, metadata
Label:    10px / 500 / tracking 3px     → ALL CAPS labels (monospace only)
```

### Rules

- The name "adam robinson" is always **lowercase** in the wordmark and in body copy when used as a brand element
- The subtitle "LEAD SOFTWARE ENGINEER" is always **uppercase monospace with 3px letter-spacing**
- Headings use **negative tracking** at large sizes (−1 to −2px). Never positive tracking on large text.
- Body text uses **1.7 line-height** for readability

---

## Spacing

Based on an **8px grid**.

```
4px   — micro (icon padding, tight gaps)
8px   — xs
16px  — sm
24px  — md  ← default component padding
32px  — lg
48px  — xl
64px  — 2xl
96px  — 3xl  ← section gaps
```

---

## Components

### Nav Bar

```
Height: 56px
Padding: 0 24px
Logo: cursor mark (8px wide) + name in monospace 17px/500
Links: 12px sans, muted color, hover → text color transition 150ms
Divider: 1px vertical line between logo and links at 500px+
```

### Cursor Mark (standalone)

The cursor is a simple rectangle. Proportions matter:

```
Small  (nav):    8px × 28px,  rx 1.5px
Medium (icon):  10px × 38px,  rx 2px
Large  (hero):  18px × 64px,  rx 3px
XL (OG card):   28px × 110px, rx 4px
```

Always `#3AAFA9` on dark, `#2A7A7A` on light.

### Links

- Default: `--color-muted`
- Hover: `--color-text`
- Active/current: `--color-accent`
- Transition: `color 150ms ease`
- No underlines in nav. Underlines optional in body copy.

### Code Blocks

```css
background: #111;
border: 1px solid #1a1a1a;
border-radius: 6px;
padding: 16px;
font-family: var(--font-mono);
font-size: 14px;
color: #e8e8e8;
```

---

## Motion

Minimal. Purposeful.

- **Page load**: fade up, 300ms, `ease-out`, staggered 60ms per element
- **Hover transitions**: 150ms `ease`
- **No bouncing, no spring physics, no parallax**
- The cursor mark can animate a **blink** on the hero only: `opacity 0→1`, 1s, `step-end`, infinite. Use sparingly — only on the hero, never in the nav.

```css
@keyframes blink {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
}

.cursor-blink {
	animation: blink 1s step-end infinite;
}
```

---

## Voice & Tone

The site copy matches the visual brand: **direct, minimal, no hype.**

- No "passionate about"
- No "I leverage synergies"
- Lowercase in casual contexts is fine
- Technical precision > marketing language
- "I build systems that help teams work better" > "Full-stack engineer with a passion for scalable solutions"

---

## What This Brand Is Not

- Not playful or colorful
- Not corporate or enterprise
- Not a startup landing page with gradients and social proof
- Not over-designed — every element earns its place

---

_Assets live in `/src/lib/assets/brand/`. The logo SVGs are framework-agnostic and import directly in SvelteKit._
