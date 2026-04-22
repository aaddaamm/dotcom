---
title: 'Your AI Agent Is Reading More Than You Think'
description: "Claude Code gathers far more context than you explicitly hand it. Here's how the CLAUDE.md hierarchy works, what it costs you, and what to do about it."
date: '2026-04-03'
tags: ['ai', 'developer-tools', 'claude']
published: true
status: 'ready'
reviewed: true
---

So you have this brand new tool: Claude Code. Maybe you're late to the game, maybe you only just got it approved for use at your company. Either way, it's time to dig in. You've been running agentic operations from your editor for a while, so you have plenty of experience communicating with LLMs. You tag files, explain what you want, and review the edits.

You log in, run your first prompt, and ask it to start exploring the repository. Maybe you've read that a good CLAUDE.md file gives the agent a strong foundation — so you build one. Then you read about domain-level files, more narrowly scoped instructions living closer to the code they describe. Smart, right? Focused context for focused work.

Then you notice your tokens burning faster than expected. Your manager is asking questions. What you may not realize is that the agent is gathering far more context than you explicitly gave it.

---

## How It Starts

For a while, AI coding tools were essentially glorified autocomplete. The model knew about the file you had open. You could nudge it by mentioning other files. Then tools got smarter — they started pulling in imports, nearby modules, related tests. You were still mostly in control of what it saw.

That dynamic has changed. Modern agentic tools like Claude Code don't wait for you to hand them context. They go looking for it. You're no longer fully in control of what the agent reads — and the gap between what you think it's loading and what it actually loads is where the surprise comes in.

## The Big File Temptation

Your first instinct is a reasonable one. The tool needs to know about your project, so you start writing. Your architecture, your conventions, the libraries you use, the patterns you've settled on, the gotchas that took your team months to learn. You put it all in one place. One file, one source of truth. You've essentially written the world's most thorough onboarding document, except it's for an AI.

And for a while, it works. The agent seems to know your project. It makes fewer mistakes. You feel like you've cracked it.

## The Split That Isn't a Fix

Then you read about domain-level files.

The idea makes sense on the surface. Instead of one massive file at the root, you create smaller, focused files closer to the code they describe. Your payments domain gets its own file. So does your auth system, your notification service, your internal tooling. Each one lean and specific. You feel organized. You feel like you've leveled up.

What you haven't realized yet is that you haven't reduced context — you've distributed it.

## The Reveal

When the agent traverses your repository to work on a task, it doesn't pick one file and ignore the rest. It loads your root file first, then picks up each domain file as it reads files in that folder. Touch six domains in a single task and you've silently loaded seven instruction files before the agent has written a single line of code. That 400-line file you broke up into ten 40-line files? The agent may load all ten. You've gone from one big file to ten smaller ones that collectively add up to more than you started with.

The problem was never the size of the file. It was never even the number of files. It's what's in them, and when they get loaded.

## How the Loading Actually Works

There are two distinct behaviors depending on where a file sits.

**At launch**, Claude loads your user-level file (`~/.claude/CLAUDE.md`) and your project root CLAUDE.md. These load before you send a single prompt, every time.

**On demand**, as Claude reads files in subdirectories below your project root, it picks up any CLAUDE.md it finds there. The trigger is a file read — not a write, not a command execution. Go deeper and the same thing happens again. Root → domain → subdomain.

The stack is additive. On any non-trivial task, the agent reads files across many directories, and each one is another instruction file added to the context. The stack grows silently as the agent works.

One caveat worth noting: subdirectory loading hasn't always been perfectly consistent in practice. Some users have reported nested CLAUDE.md files not loading as expected across different versions. Treat it as the intended behavior, but don't be surprised if it doesn't fire reliably in all cases.

## The Visibility Problem

You can see what's loaded — the `/memory` command lists all CLAUDE.md and rules files currently active in your session. That's step one.

What you don't get is a token breakdown. There's no indicator showing how much of your context window is already occupied before you've typed anything. You can see the file names, but not the cost. If you want to estimate it, you'll need to find the files listed by `/memory`, sum their sizes, and convert to approximate token counts manually.

Worth keeping in mind: according to [humanlayer.dev's analysis](https://www.humanlayer.dev/blog/writing-a-good-claude-md), Claude Code's own system prompt already consumes a significant portion of the available context budget before your CLAUDE.md is even factored in. You have less headroom than you might assume. Between the system prompt and your instruction files, a meaningful slice of your context window is spoken for before the real work begins.

The agent is working with instructions you wrote, plus instructions you forgot about, plus instructions from domain files you haven't touched in weeks. Stale or contradictory instructions compound silently — and that's the real problem.

## So What Can You Do?

Quite a lot, it turns out.

### Trim aggressively

The official guidance from Anthropic is blunt: keep your CLAUDE.md short and human-readable, and for each line ask yourself "would removing this cause Claude to make mistakes?" If not, cut it. Instructions that feel useful but aren't load-bearing just burn budget. A lean file that gets loaded everywhere does less damage than a bloated one.

### Scope your tasks tightly

The agent only loads subdirectory files when it reads files there. A well-scoped task that touches two domains loads three instruction files total (root + two). Before you send a prompt, ask yourself which parts of the codebase the agent actually needs to touch. The answer is usually smaller than your instinct suggests.

### Use `/clear` between unrelated tasks

This resets the context window entirely. If you notice the agent starting to drift or repeat mistakes, that's often a sign the context is cluttered — not that the agent is broken. A fresh session with a better prompt will almost always outperform a long session with accumulated noise.

### Use `/compact` when you need continuity

If you're mid-task and don't want to start over, `/compact` summarizes the conversation so far and replaces it with that summary — keeping enough context to continue without carrying the full token weight of every prior exchange. One detail worth knowing: your project-root CLAUDE.md is re-read from disk after compaction, so root-level instructions survive. It's conversation history and nested instruction files that get compressed away.

### Use `.claude/rules/` for scoped instructions

If you need domain-scoped instructions that don't all load at once, `.claude/rules/` with `paths:` frontmatter is the better tool. Rules defined there only load when Claude reads a file matching the specified path pattern — so you get scoped instructions without the accumulation problem. It's what subdirectory CLAUDE.md files are supposed to do, but with explicit control over when they fire.

This is the real fix for the splitting problem. Instead of ten CLAUDE.md files scattered across your repo that all load on broad tasks, you write rules that only activate for the specific file patterns they're relevant to.

### Reach for subagents on broad tasks

For tasks that genuinely need to span many domains, subagents run in isolated context windows and report back summaries. The exploration still happens — it just doesn't consume your primary context doing it. Your main conversation stays clean while the broad work happens in parallel.

---

The mental model shift is simple but important: every directory where the agent reads a file is a potential context load. Once that's clear, decisions about file structure, task scope, and session hygiene all follow naturally.
