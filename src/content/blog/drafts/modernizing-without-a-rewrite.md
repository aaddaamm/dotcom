---
title: 'Modernizing a Legacy Platform Without Betting on a Rewrite'
description: 'How to replace publishing, infrastructure, and authentication in stages while the existing product stays live.'
date: '2026-07-14'
tags: ['platform-engineering', 'legacy-systems', 'architecture']
published: false
status: 'draft'
reviewed: false
---

“We should rewrite it” is an understandable reaction to a legacy platform. The code is hard to change, dependencies are old, and every new feature seems to uncover another constraint.

The problem is that a rewrite bundles technical risk and business risk into one long bet. The existing platform keeps serving customers while the replacement tries to catch up. Requirements continue to move. Hidden behavior becomes visible only after someone depends on it.

At Healthcasts, the better path was staged modernization. The engagement began around a publishing workflow and grew into 18 months of work across content delivery, infrastructure, and authentication. Production stayed active throughout.

## Find a boundary with visible value

Modernization works best when the first boundary solves a problem people already feel.

Publishing was a useful starting point because slow time-to-publish was visible to editors and the business. A headless CMS backed by a custom React rendering layer could improve that workflow without requiring the entire platform to change at once.

This matters politically as much as technically. A modernization program earns trust when the first release makes someone's work easier. “We upgraded the architecture” is abstract. “The medical consensus deliverable publishes faster” is a result.

## Build seams before replacing systems

Legacy systems are difficult to modernize when responsibilities are tangled together. The first job is creating a seam: an API, adapter, rendering boundary, or identity interface that lets old and new behavior coexist.

A seam does not need to be perfect. It needs to make the next change safer. Once content can flow through a defined publishing pipeline, the team can improve the CMS and renderer independently. Once authentication sits behind a consistent interface, individual product surfaces no longer need to invent their own login behavior.

This is incremental architecture. Each boundary reduces the number of things the next change can break.

## Upgrade infrastructure in service of delivery

Framework and infrastructure upgrades are necessary, but version numbers are not an outcome.

The useful question is what the upgrade enables. Supported versions reduce security and operational risk. Current tooling makes hiring and maintenance easier. A clearer deployment path makes releases less stressful. Those benefits should connect to the product roadmap.

At Healthcasts, AWS and framework modernization happened alongside feature delivery. That sequencing kept the work grounded. Infrastructure changes had real workloads to prove them, and product changes benefited from a more supportable foundation.

## Treat identity as a platform capability

Authentication gets duplicated when each product solves an immediate login problem. Over time, users get different sessions, teams maintain different security logic, and new initiatives depend on identity data nobody fully trusts.

Unifying login with Auth0 was larger than swapping an authentication library. It meant establishing one secure flow across product surfaces and creating a cleaner identity layer for future work, including a parallel AI initiative.

Identity migrations need careful staging. Existing sessions, password flows, redirects, and account matching all deserve explicit plans. The safest cutover is usually observable and reversible, with old and new behavior running side by side long enough to expose incorrect assumptions.

## Use expansion as evidence

A phased modernization should make the next phase easier to approve. The publishing work proved the team could deliver inside the existing constraints. That trust opened room for infrastructure and authentication work. The engagement expanded because each stage produced value and reduced risk.

This is the opposite of asking the organization to wait a year for a replacement platform. It creates a series of smaller commitments:

- improve one painful workflow
- establish a durable boundary
- prove it in production
- use what the team learned to choose the next boundary

The roadmap can still be ambitious. The bets are simply smaller.

## Modernization is a delivery strategy

The strongest argument against a rewrite is not that rewrites always fail. Some are necessary. It is that modernization should preserve the organization's ability to learn while work is underway.

Staged delivery gives users improvements sooner, exposes hidden constraints earlier, and leaves the team with several useful stopping points. If priorities change after phase two, the first two phases still created value.

That is the standard I use: every stage should make the current system better and the next change safer. When it does, legacy modernization stops being an endless cleanup project and becomes part of normal product delivery.
