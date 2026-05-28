---
title: Dual-intent conversion pattern for hiring + contract audiences
category: architecture
severity: medium
tags:
  [
    'dual-intent',
    'cta hierarchy',
    'contact form',
    'intent routing',
    'anonymized case study',
    'sveltekit'
  ]
applies_when:
  - Personal/professional site must serve full-time hiring and contract leads simultaneously
  - Public portfolio evidence is limited due to confidentiality
  - Contact form is primary conversion surface
---

# Problem

A single-site narrative was too generic for two distinct audiences (hiring managers and contract buyers), reducing clarity and lead quality.

# Context

The site needed equal priority for full-time and contract opportunities, while most impactful work could only be shared in anonymized form.

# Solution

Apply a dual-intent architecture:

- Hero copy explicitly names both intents
- CTA hierarchy is fixed: contact form (primary) → direct email (secondary) → résumé (supporting)
- Contact backend derives inquiry intent from project type and prefixes email subject (`[Consulting]`, `[Contract]`, `[Full-Time]`)
- Work page includes confidentiality-safe anonymized case studies with required structured fields
- Homepage includes interactive proof module to increase credibility signal

# Why this works

It separates audience intent early without fragmenting the brand, captures higher-quality inbound context, and adds trust signals despite limited public artifacts.

# Prevention

For future site changes:

- Preserve CTA order unless conversion data proves a better sequence
- Keep intent-routing tests for contact subjects
- Require anonymized case-study schema fields before publishing
- Enforce RED→GREEN tests for copy/interaction changes that affect conversion paths
