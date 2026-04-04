---
title: 'How Claude Code Loads Context (And Why It Matters)'
description: "A practical breakdown of how CLAUDE.md files get loaded during agentic tasks — and how to stop burning context budget before you've written a line of code."
date: '2026-04-03'
tags: ['ai', 'developer-tools', 'claude']
published: false
---

You set up a CLAUDE.md at your repo root, maybe a few more in subdirectories, and the agent starts behaving the way you want. Then you notice your context filling up faster than expected on longer tasks. You haven't tagged a dozen files — so what's going on?

The short answer: Claude Code is loading files you didn't explicitly reference, and it does it silently every time.

---

## How CLAUDE.md Loading Works

The loading behavior follows a simple traversal rule: every directory the agent enters, it checks for a CLAUDE.md and loads it if one exists.

The root file loads first, on every task. From there, as the agent moves into subdirectories to read or write files, it picks up each domain-level CLAUDE.md it encounters along the way. The stack is additive — there's no deduplication, no cap, no warning when it's getting large.

So if your task touches six domains, you've loaded seven files (root + six domain files) before the agent has done any actual work.

## The Splitting Trap

A common pattern is to start with one large CLAUDE.md and break it up into smaller, more focused files as the project grows. It feels like good hygiene — smaller files, closer to the code they describe.

The problem is that splitting doesn't reduce context, it distributes it. That 400-line root file you refactored into ten 40-line domain files? On a task that touches all ten domains, the agent loads all ten. You've traded one large file for ten smaller ones that collectively cost more.

The file count isn't the issue. The content is — specifically, what's in those files and how many of them get loaded on any given task.

## What You Can't See

There's no built-in visibility into what's been loaded. No summary at session start, no token counter showing context consumed by instruction files before your first prompt. The agent is operating on a combination of what you just said, what you wrote weeks ago, and what you forgot you even wrote — and it's all weighted equally.

This matters most on long-running tasks or sessions where you've already accumulated a lot of back-and-forth. Stale or contradictory instructions compound silently.

## Practical Controls

**Trim the files aggressively.** Anthropic's own guidance is direct: for every line in your CLAUDE.md, ask whether removing it would cause the agent to make a mistake. If not, cut it. Instructions that feel useful but aren't load-bearing just burn budget.

**Scope your tasks tightly.** The agent only loads domain files for directories it actually enters. A well-scoped task that touches two domains loads three files total. Think about the minimum surface area before you send a prompt — it's usually smaller than your first instinct.

**Use `/clear` between unrelated tasks.** This resets the context window entirely. If the agent starts drifting or producing inconsistent output mid-session, accumulated context noise is usually the first thing to rule out. A clean session with a precise prompt consistently outperforms a long session with a cluttered one.

**Use `/compact` when you need continuity but not the full history.** Where `/clear` wipes everything, `/compact` summarizes the conversation so far and replaces it with that summary — preserving enough context to keep going without carrying the full token weight of every prior exchange. Useful mid-task when you're deep into something and don't want to start over, but the session is getting bloated.

**Reach for subagents on broad tasks.** For tasks that genuinely need to span many domains, subagents run in isolated context windows and return summaries. The exploration still happens — it just doesn't consume your primary context doing it.

---

The mental model worth internalizing: every directory the agent enters is a potential context load. Once that's clear, decisions about file structure, task scope, and session hygiene all follow naturally.
