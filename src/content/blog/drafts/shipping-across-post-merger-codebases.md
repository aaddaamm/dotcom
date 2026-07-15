---
title: 'Shipping Across Three Codebases After a Merger'
description: 'A practical approach to delivering across different stacks, product histories, and teams without forcing premature uniformity.'
date: '2026-07-14'
tags: ['engineering-teams', 'delivery', 'architecture']
published: false
status: 'draft'
reviewed: false
---

Company mergers happen faster than software mergers.

The organization chart changes. The products keep their own codebases, release processes, naming conventions, and assumptions about customers. Leadership wants one experience while engineering is still operating several histories at once.

I worked in that environment at Angi after HomeAdvisor, Handy, and Angie's List came together. During one engagement I shipped in a Vue and Java application, a Rails and React application, and a Next.js and Contentful application. The goal was not to make every repository look the same. It was to help the combined product move forward.

## Learn the local rules first

The fastest way to lose time in a new codebase is to begin by correcting it.

Each system has reasons for its shape. Some are good decisions from an earlier stage of the product. Some are constraints imposed by another team. Some are debt. You cannot tell which is which from a directory listing.

I start by learning how the application is released, where its boundaries are, who owns adjacent systems, and what failures matter most. I look for existing patterns before introducing new ones. Consistency inside a codebase is usually more valuable than importing a preferred pattern from somewhere else.

This does not mean accepting every local decision. It means earning enough context to change the right ones.

## Standardize outcomes before implementation

Post-merger teams reach for a shared framework or design system because technical uniformity feels like progress. Sometimes it is. Sometimes it creates a fourth migration while customers still see three different experiences.

A better first target is a shared outcome.

On HomeAdvisor, the work centered on unifying a quiz flow into one Angi experience. The implementation still lived in the local Vue and Java stack. The customer-facing behavior moved toward the combined product before the underlying technology became uniform.

That sequencing creates options. Once teams agree on the experience and data contracts, they can decide whether code consolidation will produce enough value to justify its cost.

## Keep context switches explicit

Working across several stacks is less about memorizing syntax than managing context.

Each repository has different test commands, deployment expectations, and review norms. Relying on memory leads to the wrong check or the wrong convention. Short repository notes, repeatable commands, and small pull requests reduce that risk.

I also avoid mixing unrelated system changes in one workstream. A focused change in Rails should not quietly depend on a cleanup in Next.js unless the product requirement truly crosses both. Explicit dependencies make review and rollback easier.

## Optimize for reversible delivery

Merger environments already contain organizational uncertainty. Technical changes should not add more than necessary.

Small releases, feature flags, adapters, and clear ownership boundaries help teams ship while the future architecture is still being decided. A reversible implementation may look less elegant than a full consolidation. It gives the organization room to learn from real usage.

At Handy, that meant improving assignment logic and job ingestion inside the existing Rails and React product. At Angie's List, it meant building a CMS-driven Next.js content experience that fit that product's publishing needs. Both contributed to the broader company without waiting for one universal stack.

## Use mentorship as delivery work

Post-merger engineering is not only a systems problem. Teams are learning new domains and new colleagues at the same time.

At Angi, I mentored interns through a real Careers page revamp. The work had production constraints, review feedback, and a concrete demo at the end. That made mentorship part of delivery instead of a separate simulated exercise.

This pattern scales beyond interns. Pairing engineers across former company boundaries transfers context that documentation alone will miss. A shared feature gives people a reason to learn how another product actually works.

## Uniformity is not the immediate goal

Three codebases are not automatically a failure. They become a problem when product work cannot cross their boundaries, customers receive contradictory experiences, or every change requires coordination nobody can explain.

The first job after a merger is to make delivery coherent. Establish shared outcomes, define contracts, keep changes reversible, and move knowledge between teams. Consolidate technology where it removes a measured bottleneck.

That approach is less dramatic than announcing one new platform. It is also how teams keep shipping while the company figures out what “one product” needs to mean in practice.
