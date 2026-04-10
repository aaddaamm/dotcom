# TICKET-019 — Terminal Easter Egg

## Summary

Add a hidden terminal to the site with two modes: a pure terminal mode (unix commands, fake filesystem) and an RPG mode (Dragon Quest dialogue boxes, Final Fantasy job classes, Zelda-style discovery moments). Visitor starts typing anywhere and the terminal slides up from the bottom. The two modes can coexist — pure terminal by default, RPG flavor woven in as surprises.

Brand-aligned: dark background, teal prompt, monospace. But with whimsy.

---

## Trigger Mechanism

**Decision needed:** hidden easter egg vs. visible prompt.

### Option A — Hidden (recommended)

Keydown listener on `window`. When the user starts typing anywhere (and isn't focused in a form/input), the terminal slides up from the bottom as a drawer and their keystrokes are captured as a command. Discoverable but not advertised — rewards curious visitors.

The page looks exactly as it does today — no new UI. A visitor scrolling, reading work history, types `whoami` on a whim. The drawer slides up over the mobile FAB, below the header:

```
[normal site content]
[normal site content]
════════════════════════════════════
adam@adamrobinson.tech:~$ whoami█
════════════════════════════════════
```

The drawer covers roughly the bottom half of the viewport. `Escape` dismisses it. Site content is still visible above.

**Conflict to note:** the `mobile-fab` is fixed at `bottom: 24px`. The terminal drawer needs to sit above it or suppress it while open. On desktop this is fine; on mobile it's moot since there's no physical keyboard to trigger the easter egg.

- Pros: feels like a real terminal, stays minimal, doesn't clutter the UI
- Cons: mobile users won't find it; keydown listener must carefully skip inputs, textareas, contenteditables, `[role="dialog"]`, and meta/ctrl key combos

### Option B — Visible prompt

A faint `> _` blinking prompt placed somewhere persistent. Most natural fit is the footer, after the copyright line:

```
© 2026 Adam Robinson          Built with SvelteKit

> _
```

The `> _` blinks (same animation as the hero cursor, but smaller — `12px` mono, `var(--color-muted)`). Clicking it opens the terminal drawer. Works on mobile via tap.

Alternatively could live below the hero CTA buttons on the homepage only — keeps it contextual without appearing on every page (`/contact`, `/blog/[slug]`, etc.).

- Pros: more discoverable, works on mobile
- Cons: adds a third accent moment to the footer (footer-link hover is already teal); a blinking cursor in the footer of every page may feel mismatched on non-home routes; adds permanent UI to earn something Option A already does better

### Option C — URL route

`/terminal` — a dedicated full-screen page. Visiting it renders nothing but the terminal, pinned to the bottom or centered. No drawer animation — it just is the page.

```
URL: adamrobinson.tech/terminal

┌─────────────────────────────────────────────────┐
│                                                 │
│  adam@adamrobinson.tech:~$ █                    │
│                                                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

Shareable and linkable — droppable in a README, LinkedIn post, or blog article. Sidesteps all trigger/conflict problems (no keydown hijacking, no footer element, no FAB collision). Uses the same component as Option A; `/terminal` just renders it open by default.

- Pros: most shareable, zero trigger complexity, works on mobile
- Cons: no surprise — finding it via a route is navigation, not discovery

### Recommendation

**A + C together.** A is the discovery path (rewards curious visitors who type). C is the shareable path (for README, blog posts, etc.). They use the same component. Option B isn't worth the tradeoff.

---

## Visual Design

- **Container:** full-width drawer, slides up from bottom, ~40–50vh tall
- **Background:** `#0a0a0a` (void) — always dark regardless of site theme
- **Font:** `JetBrains Mono`, 14px
- **Prompt:** `adam@adamrobinson.tech:~$ ` in teal (`var(--color-accent)`)
- **Output text:** `#e8e8e8`
- **Cursor:** blinking block, same teal
- **Open animation:** `transform: translateY(100%) → 0`, 300ms ease-out
- **Close:** `Escape` key, or a subtle `×` in the top-right corner

Matches the existing code block style (`#111` bg, `#1a1a1a` border) and the brand's terminal aesthetic.

---

## Commands

### Core

| Command         | Output                                                       |
| --------------- | ------------------------------------------------------------ |
| `whoami`        | Short bio — name, role, years experience, current engagement |
| `help`          | Lists all available commands with one-line descriptions      |
| `clear`         | Clears terminal output                                       |
| `exit` / `quit` | Closes the terminal drawer                                   |

### Filesystem (fake)

| Command             | Output                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------- |
| `ls`                | Lists top-level "directories": `work/`, `blog/`, `contact`                               |
| `ls work`           | Lists project slugs: `icapital`, `angi`, `shell`, `healthcasts`                          |
| `cd work/icapital`  | Changes fake prompt path to `~/work/icapital$`, unlocks `cat README.md` for that project |
| `cat resume.txt`    | Outputs a plain-text version of key resume info                                          |
| `cat work/icapital` | Brief on the engagement — role, stack, what was built                                    |

### Contact / Meta

| Command       | Output                                       |
| ------------- | -------------------------------------------- |
| `contact`     | Outputs email + links (GitHub, LinkedIn)     |
| `open hire`   | Prints a short pitch and a link to `/hire`   |
| `echo $STACK` | Outputs tech stack as a comma-separated list |

### Easter egg within the easter egg

| Command          | Output                                                          |
| ---------------- | --------------------------------------------------------------- |
| `sudo hire adam` | `Permission granted. Redirecting to /contact...` then navigates |
| `git log`        | Fake commit history with dry-humor commit messages              |
| `rm -rf .`       | `Nice try.`                                                     |
| `vim`            | `You're already in a terminal. Don't push it.`                  |

---

## Tab Completion

Nice-to-have. When the user presses Tab, autocomplete the current token against known commands and filesystem paths. Would make the terminal feel genuinely interactive rather than just a novelty.

Implementation: maintain a list of valid completions per context (root vs. inside `work/`). On Tab keydown, find the longest common prefix of matching completions.

---

## Architecture

- **Component:** `src/components/terminal.svelte` — self-contained, imported in `+layout.svelte`
- **State:** `isOpen: boolean`, `history: string[]`, `input: string`, `cwd: string`
- **Command handling:** `src/lib/terminal-commands.ts` — map of command name → handler function. Keeps the component clean and commands easy to add.
- **Content:** command output can pull from the same `copy.ts` data used by the homepage (work entries, stack, etc.) so it stays in sync automatically.
- **Keyboard capture:** `window` keydown listener, active only when terminal is closed. Skip if `event.target` is an input, textarea, or contenteditable.

---

## Out of Scope (for now)

- Mobile support (keyboard trigger won't work; could add a tap trigger later)
- Persistent history across sessions (localStorage — easy to add post-MVP)
- Actual navigation within the fake filesystem (full `cd` support adds complexity)
- Syntax highlighting in output

---

---

## RPG Mode

Inspired by Dragon Quest, Final Fantasy, and Zelda. The terminal stays monospace and dark, but certain commands (or a mode toggle) switch the output style to something warmer and more narrative. Think: dialogue boxes, item descriptions, job class screens.

### Tone examples

**`whoami` in RPG mode:**

```
┌─────────────────────────────────────┐
│  ADAM ROBINSON                      │
│  JOB CLASS: Senior Engineer  LV 10  │
│  HP: ████████████  MP: ████████░░   │
│                                     │
│  A wandering engineer of ten years. │
│  Backend-leaning. Ships clean code. │
│  Currently embedded at iCapital.    │
└─────────────────────────────────────┘
```

**`ls work` in RPG mode:**

```
  You open the chest.
  Inside you find:

  ⚔  iCapital     — Fintech dungeon, still active
  🏰  Healthcasts  — Legacy fortress, rebuilt from within
  🌋  Shell        — Oil platform at world's edge
  🗺  Angi         — Three kingdoms, one ranger
```

**`cat work/healthcasts` in RPG mode:**

```
  HEALTHCASTS
  ════════════════════════════
  A crumbling PHP stronghold.
  Auth system held together with string.
  You ripped it out. Replaced it with OAuth.
  The engineers cheered (eventually).

  OUTCOME: Four-year alliance formed.
```

**`sudo hire adam`:**

```
  ❯ HIRE ADAM?
    ▶ YES
      NO

  ...

  ✨ Adam has joined the party!
  Redirecting to /contact...
```

**`git log` in RPG mode:**

```
  a3f9c12  fix: slew the null pointer demon (again)
  b812dd0  feat: forged the OAuth amulet
  cc4491e  refactor: untangled the spaghetti dungeon
  d009fe1  chore: resupplied at the npm inn
  e774a30  docs: transcribed the ancient CLAUDE.md scrolls
```

**`vim`:**

```
  A cursed editor. Many have entered.
  Few have exited.
  [ Press :q to escape... if you can. ]
```

**`rm -rf .`:**

```
  ⚠ DANGER
  This action would destroy the known world.
  The spirits of /bin refuse your request.
```

### Mode toggle

- `mode rpg` — switches to RPG output style
- `mode terminal` — switches back to plain terminal
- Default is terminal; RPG is opt-in (or triggered by discovering a secret command)
- Secret unlock candidate: `zelda`, `chocobo`, `dragon quest` — outputs something delightful and enables RPG mode permanently for the session

### Visual additions for RPG mode

- Dialogue boxes drawn with box-drawing characters (`┌─┐│└─┘`) — pure monospace, no images
- Slight text-crawl animation on narrative output (characters appear one at a time, ~20ms each) — classic RPG feel
- FF-style HP/MP bars using block characters (`█░`)
- Item/chest emoji used sparingly for flavor (⚔ 🏰 ✨) — whimsical but not overdone

---

## Open Questions

1. Hidden easter egg or visible prompt? (see Trigger section)
2. Should `cat resume.txt` output inline or trigger a download?
3. Any specific `git log` commit messages you want in there?
4. RPG mode: opt-in toggle, or woven in as surprises within the normal terminal?
5. Any specific DQ/Zelda/FF references you want hidden in there?
