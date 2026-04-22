# Accessibility Audit — 2026-04-22

Scope:

- `/`
- `/blog`
- `/work`
- `/hire`
- `/contact`
- `/play`
- `/terminal`

## Automated checks

- Lighthouse accessibility: 100 on audited routes
- `npm run check:lighthouse`: pass

## Manual audit notes

### Keyboard navigation

- Skip link is reachable and visible on focus
- Header nav links are keyboard reachable
- Theme toggle is keyboard operable
- Contact form fields, select controls, and submit button are keyboard operable
- Terminal controls and input are keyboard operable

### Screen reader semantics

- Main navigation has explicit label
- Sections consistently use `aria-labelledby`
- Decorative accents use `aria-hidden`
- Contact success and error states announce via live regions/alerts

### Motion & reduced motion

- Hash navigation respects `prefers-reduced-motion`
- Stack-item click animation on home page is disabled when reduced motion is enabled

## Improvements applied in this pass

1. Added active-page semantics to main nav links via `aria-current="page"`
2. Added `aria-pressed` to theme toggle state
3. Updated hash navigation behavior to respect reduced motion
4. Disabled home-page stack click animation when reduced motion is enabled

## Follow-ups

- Run VoiceOver pass on Safari after next major content update
- Run NVDA + Firefox pass when a Windows environment is available
