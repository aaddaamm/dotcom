---
title: Contact endpoint origin hardening and safe transitive audit remediation
category: security
severity: high
tags: ['api', 'contact-form', 'origin-validation', 'sveltekit', 'npm-overrides', 'supply-chain']
applies_when:
  - A public contact API endpoint accepts browser JSON submissions
  - Build output shows optional dependency warnings from third-party SDKs
  - npm audit reports transitive vulnerabilities where force-fix is risky
---

# Problem

A public contact endpoint was protected by rate limiting and validation, but did not explicitly reject untrusted cross-site origins. Build logs also contained optional dependency warnings, and audit findings required careful transitive dependency remediation.

# Context

`/api/contact` is a high-value spam/abuse target. The site also depends on SDKs with transitive dependency trees (`resend`/`svix`), where naive `npm audit fix --force` can introduce breaking changes.

# Solution

- Add explicit `origin` allow-list logic in the endpoint handler.
  - Allow production site origin.
  - Allow localhost origins in development.
  - Return `403` on invalid origin.
- Add a dedicated API response helper for `forbidden` to keep response semantics consistent.
- Add regression test coverage for invalid cross-site origin requests.
- Resolve optional SDK warning by adding required optional dependency (`@react-email/render`).
- Use `package.json` `overrides` to pin secure transitive versions (`cookie`, `uuid`) instead of force-upgrading top-level packages.

# Why this works

It layers abuse resistance without changing normal user flow, keeps the endpoint behavior explicit, and removes vulnerability pressure through controlled, reversible dependency constraints.

# Prevention

- For all public POST endpoints, require origin policy checks and tests.
- Prefer targeted overrides for transitive vulnerabilities before force-upgrading major dependencies.
- Keep full verification gate after dependency changes: `test`, `check`, `lint`, `build`, `audit`.

# Future planning/review impact

- `02-plan`: include “origin validation + malicious-origin test” in endpoint-hardening units.
- `04-review`: flag any public POST route lacking origin policy and negative-path tests.

## 🧠 Context Status

- Health: stable (tests/check/lint/build/audit all passing)
- Handoff path: `.context/compound-engineering/handoffs/2026-04-30-contact-security-hardening-handoff.md`
- Active files: `src/routes/api/contact/+server.ts`, `src/routes/api/contact/contact.test.ts`, `src/lib/server/api-response.ts`, `package.json`, `package-lock.json`
- New-session recommendation: safe to continue in a new session; no partial migrations pending
