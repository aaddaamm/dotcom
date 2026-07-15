---
title: 'Designing Bulk Processing Without Building a Batch-Job Trap'
description: 'Practical design choices for turning fragmented high-volume workflows into one observable, recoverable service.'
date: '2026-07-14'
tags: ['architecture', 'fintech', 'ruby-on-rails']
published: false
status: 'draft'
reviewed: false
---

The requirement for bulk processing sounds compact: take thousands of records and process them together.

The hard part starts when those records represent real business actions. Some are valid. Some are stale. A downstream dependency will eventually fail. An operator will need to understand what happened without reading application logs for an hour.

I ran into this class of problem while embedded on iCapital's alternative investment platform. Several nominee investment flows needed to become one coherent process capable of handling thousands of investments. The useful lesson was not a particular Rails class or database table. It was that high-volume work needs a product boundary, not only a loop.

## Start with the unit of work

Before choosing queues or concurrency limits, define what the system is processing.

A request containing 2,000 items is not necessarily one transaction. It may be one user intent containing 2,000 independently valid operations. Treating the whole request as atomic can make one bad item block every good item. Treating every item as completely unrelated can make the overall workflow impossible to track.

The middle ground is an explicit batch with child operations. The batch records the original intent and aggregate state. Each child records its own progress and result. That gives the application somewhere durable to answer basic questions:

- Was the request accepted?
- How much work completed?
- Which items failed?
- Can failed items be retried safely?

If the data model cannot answer those questions, the background-job system will not rescue it.

## Make retries part of the design

Retries are normal in distributed systems. They become dangerous when the work is not idempotent.

Every operation needs a stable identity and a clear rule for repeated execution. A retry should continue incomplete work or return the result of completed work. It should not create a second investment, send a second notification, or advance the same state twice.

That usually means checking current state at the point of mutation, recording external identifiers, and putting uniqueness constraints behind assumptions that matter. An application-level `if` statement is helpful. A database constraint is stronger.

## Separate acceptance from completion

Large workflows should acknowledge that work was accepted before every item finishes. This keeps request latency predictable and gives the processing layer room to control throughput.

It also changes the interface. The caller needs a batch identifier and a status model. Operators need progress that means something. “Running” is rarely enough. Counts for pending, completed, and failed operations make the system easier to use and support.

This is where observability becomes part of the feature. Structured events, batch-level metrics, and searchable identifiers are not cleanup work. They are how the team operates the workflow once it reaches production.

## Put concurrency behind a control surface

More workers do not automatically mean more throughput. A bulk service may depend on a database, an external API, or another internal service with its own limits. Unbounded concurrency moves the bottleneck and makes failures less predictable.

Start conservatively. Measure processing time, queue depth, error rate, and downstream saturation. Then increase concurrency where the data supports it. A configuration value that can be changed safely is more useful than a clever hard-coded fan-out.

## Design the failure experience

The happy path gets most of the attention during implementation. The failure path determines whether the feature is trustworthy.

Decide what users and operators can do when 37 of 2,000 items fail. They may need to download errors, correct input, retry only failed items, or understand that a dependency is temporarily unavailable. Those are product decisions with architectural consequences.

The best bulk systems are boring under stress. They accept work, make progress visible, isolate failures, and allow safe recovery. That does not happen because the job framework has a retry button. It happens because the service was designed around durable intent and partial completion from the start.

## The test I use

Before calling a bulk workflow finished, I ask one question: if the process stops halfway through and a different engineer is paged, can they explain the state and recover it without guessing?

If the answer is no, the implementation is still a batch-job trap. If the answer is yes, it is becoming a service the business can rely on.
