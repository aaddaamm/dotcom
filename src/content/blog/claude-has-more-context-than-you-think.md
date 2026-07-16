---
title: 'Your AI Agent Is Reading More Than You Think'
description: "Claude Code gathers far more context than you explicitly hand it. Here's how the CLAUDE.md hierarchy works, what it costs you, and what to do about it."
date: '2026-04-03'
updated: '2026-07-16'
tags: ['ai', 'developer-tools', 'claude']
published: true
status: 'ready'
reviewed: true
---

So you have this brand new tool: Claude Code. Maybe you're late to the game, maybe you only recently got it approved for use at your company. Either way, it's time to dig in. You've been running agentic operations from your editor for a while, so you have plenty of experience communicating with LLMs. You tag files, explain what you want, and review the edits.

You log in, run your first prompt, and ask it to start exploring the repository. Maybe you've read that a good CLAUDE.md file gives the agent a strong foundation, so you build one. Then you add domain-level files closer to the code they describe, expecting them to keep context focused.

Then you notice your tokens burning faster than expected. Your manager is asking questions. What you may not realize is that the agent is gathering far more context than you explicitly gave it.

---

## How It Starts

For a while, AI coding tools were essentially glorified autocomplete. The model knew about the file you had open, and you could nudge it by mentioning other files. Later tools began pulling in imports, nearby modules, and related tests. You were still mostly in control of what they saw.

Modern agentic tools like Claude Code gather repository context on their own. The difference between what you expect them to load and what they actually load can go unnoticed.

## The Big File Temptation

Your first instinct is a reasonable one. The tool needs to know about your project, so you start writing. Your architecture, your conventions, the libraries you use, the patterns you've settled on, the gotchas that took your team months to learn. You put it all in one place. One file, one source of truth. You've essentially written the world's most thorough onboarding document, except it's for an AI.

The agent seems to know your project and makes fewer mistakes, which reinforces the approach.

## The Split That Isn't a Fix

Then you read about domain-level files.

Instead of one massive file at the root, you create smaller files closer to the code they describe. Your payments domain gets its own file, followed by auth, notifications, and internal tooling. Each file is focused on one area.

The split changes where the context lives, not how much the agent can load.

## The Reveal

When the agent traverses your repository, it loads the root file first and then picks up domain files as it reads code in those folders. A task that touches six domains can load seven instruction files before the agent writes code. Splitting a 400-line file into ten 40-line files doesn't reduce context if the task causes all ten to load.

The content and loading behavior matter more than the number of files.

## How the Loading Actually Works

There are two distinct behaviors depending on where a file sits.

**At launch**, Claude loads your user-level file (`~/.claude/CLAUDE.md`) and your project root CLAUDE.md. These load before you send a single prompt, every time.

**On demand**, as Claude reads files in subdirectories below your project root, it picks up any CLAUDE.md it finds there. A file read triggers the load; writes and command execution do not. The same rule applies at deeper levels: root → domain → subdomain.

The stack is additive. On any non-trivial task, the agent reads files across several directories, and each one is another instruction file added to the context. The stack grows silently as the agent works.

Nested-file loading has varied across versions, so use `/memory` to verify which files are active in the current session.

## The Visibility Problem

The `/memory` command lists all CLAUDE.md and rules files currently active in your session.

The command doesn't provide a token breakdown or show how much of the context window is already occupied. Estimating that cost requires finding the listed files, summing their sizes, and converting the total to an approximate token count.

According to [humanlayer.dev's analysis](https://www.humanlayer.dev/blog/writing-a-good-claude-md), Claude Code's system prompt consumes a significant portion of the context budget before CLAUDE.md is included. The system prompt and project instructions both reduce the space available for the task itself.

Stale or conflicting instructions from forgotten domain files can accumulate without being obvious in the conversation.

## How to Control It

### Trim aggressively

The official guidance from Anthropic is blunt: keep your CLAUDE.md short and human-readable, and for each line ask yourself "would removing this cause Claude to make mistakes?" If not, cut it. Instructions that feel useful but aren't load-bearing burn budget. A lean file that gets loaded everywhere does less damage than a bloated one.

### Scope your tasks tightly

The agent only loads subdirectory files when it reads files there. A well-scoped task that touches two domains loads three instruction files total (root + two). Before sending a prompt, identify which parts of the codebase the agent needs to touch and keep the request within that boundary.

### Use `/clear` between unrelated tasks

This resets the context window entirely. If the agent starts drifting or repeating mistakes, accumulated context may be contributing. A fresh session removes that history and lets you start with a focused prompt.

### Use `/compact` when you need continuity

If you're mid-task and don't want to start over, `/compact` summarizes the conversation and replaces it with that summary. Your project-root CLAUDE.md is re-read from disk after compaction, so root-level instructions survive while conversation history and nested instruction files are compressed.

### Use `.claude/rules/` for scoped instructions

If you need domain-scoped instructions that don't all load at once, use `.claude/rules/` with `paths:` frontmatter. A rule loads when Claude reads a file matching its path pattern, giving you explicit control over when the instruction enters context.

Instead of scattering ten CLAUDE.md files across the repository, write rules that activate only for the file patterns they cover.

### Reach for subagents on broad tasks

For tasks that need to span several domains, subagents can explore in isolated context windows and report back summaries. Their exploration doesn't consume the primary conversation's context window.

---

Every directory where the agent reads a file can add instructions to context. Use that model when deciding where instructions live and how broadly to scope a task.
