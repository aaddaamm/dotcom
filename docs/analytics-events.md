# Analytics Events

This doc is the source of truth for custom analytics events sent via `src/lib/analytics.ts`.

## Event catalog

### `CTA Clicked`

Triggered when primary/secondary call-to-action links are clicked.

Payload:

- `label` (string): human-readable CTA text
- `location` (`CtaLocation`): strict location key

Allowed `location` values:

- `home-hero-primary`
- `home-hero-secondary`
- `services`
- `mobile-fab`
- `contact-top-secondary`
- `contact-top-secondary-work`
- `hire-top-primary`
- `hire-top-secondary`
- `hire-bottom-primary`
- `work-top-primary`
- `work-top-secondary`
- `teach`

### `Scroll Depth`

Triggered at 25/50/75/100% milestones.

Payload:

- `depth` (string): milestone (`25%`, `50%`, etc.)
- `path` (string): current route pathname

### `Contact Form Started`

Triggered on first form interaction.

Payload:

- `source`: `contact-page`

### `Contact Form Validation Error`

Triggered when client validation fails on submit.

Payload:

- `field_count` (number): number of fields with validation errors

### `Contact Form Submitted`

Triggered on successful submit response.

Payload:

- `project_type` (string)
- `has_phone` (`yes` | `no`)
- `has_timeline` (`yes` | `no`)
- `has_budget` (`yes` | `no`)

### `Resume Downloaded`

Triggered when resume links are clicked.

Payload:

- `location`: `hire-page`
- `file_type`: `pdf` | `docx`

### `Terminal Opened`

Payload:

- `source`: `keyboard` | `button` | `page`

### `Terminal Command`

Payload:

- `command` (string)
- `mode` (string)

### `Terminal Mode Changed`

Payload:

- `to` (string)

## Guardrails

- Add new events through `src/lib/analytics.ts` (do not call `track()` directly in components)
- Keep payload keys stable (dashboard/report continuity)
- Prefer typed enums/unions for constrained values to prevent naming drift
