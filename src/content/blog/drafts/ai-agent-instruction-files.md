---
title: 'AGENTS.md, CLAUDE.md, GEMINI.md, and the New AI Instruction Layer'
description: 'AI coding tools are converging on Markdown instruction files, but not on what those files mean. Here is how to think about the new instruction layer.'
date: '2026-06-06'
tags: ['ai', 'developer-tools', 'coding-agents']
published: false
status: 'draft'
reviewed: false
---

A few years ago, a repository had a README, maybe a CONTRIBUTING file, and some scattered docs if the team was disciplined.

Now it has another layer.

`AGENTS.md`. `CLAUDE.md`. `GEMINI.md`. `.cursor/rules`. `.github/copilot-instructions.md`. Sometimes `SYSTEM.md`, `DESIGN.md`, or a `SKILL.md` tucked into a workflow folder.

At first glance, these look like the same idea with different names: a Markdown file that tells the AI what to do.

That is partly true. It is also where people get into trouble.

The file name is not the important part. The important part is **who reads it, when it gets loaded, how much authority it has, and whether another tool will understand it tomorrow**.

That is the new configuration layer for AI-assisted development.

## The short version

These files all exist to solve the same basic problem: coding agents start with too little project context.

They do not know your test command. They do not know your route conventions. They do not know that one legacy folder is off limits, that your Svelte components use tabs, or that touching a certain API route has production consequences.

You can repeat that context in every prompt, or you can put it somewhere the tool loads automatically.

That is what these files are for.

But they are not interchangeable.

Some are portable project instructions. Some are tool-specific memory. Some are scoped rules. Some are design docs. Some are pretending to be system prompts without actually being system prompts.

The distinction matters because instruction files cost context. They also shape behavior before you have said anything in the chat.

## AGENTS.md

`AGENTS.md` is the closest thing we have to a cross-tool standard.

The pitch is straightforward: README files are for humans; `AGENTS.md` is for agents. Put the build commands, test commands, coding conventions, project structure, and gotchas in one predictable place.

OpenAI Codex reads `AGENTS.md`. The public [agents.md](https://agents.md/) site positions it as a small, tool-agnostic convention. Several other tools and editors now support it or are moving in that direction.

This is the file I would start with in a new repo.

Use it for things like:

- how to install dependencies
- how to run tests and checks
- code style rules
- project structure
- important routes or modules
- deployment constraints
- files the agent should not touch casually

Keep it practical. The agent does not need your company history. It needs the stuff that prevents bad edits.

A good `AGENTS.md` reads like an onboarding note from the engineer who knows where the bodies are buried.

## CLAUDE.md

`CLAUDE.md` is Claude Code's project memory file.

It overlaps with `AGENTS.md`, but it is tied to Claude Code's loading behavior and memory model. Claude can load user-level instructions, project-level instructions, and nested files depending on where it works.

That makes it useful. It also makes it tempting to overdo.

I wrote about this in [Your AI Agent Is Reading More Than You Think](/blog/claude-has-more-context-than-you-think): splitting one big instruction file into several smaller ones does not automatically reduce context. If the agent reads across several directories, it can accumulate several instruction files before it writes a line of code.

That is the main risk with `CLAUDE.md`.

It feels like documentation. It behaves like loaded context.

Use `CLAUDE.md` when you are intentionally optimizing for Claude Code. Put Claude-specific workflow notes there. Keep shared project rules in `AGENTS.md` if you want other tools to benefit too.

The mistake is duplicating everything across both files. That creates drift. One file says run `npm test`; the other says run `npm run check`. The agent follows the wrong one at the worst possible time.

## GEMINI.md

`GEMINI.md` is the Gemini CLI version of persistent context.

Google's Gemini CLI docs describe it as a way to provide project-specific instructions, persona guidance, and coding style context. It also supports hierarchical loading and imports with `@file.md`, which makes it more modular than a single root file.

That power cuts both ways.

Imports are helpful when you want one root file to reference focused docs. They are dangerous when you turn your context file into a table of contents for the entire repo.

The same rule applies: do not load documentation because it exists. Load it because it changes the quality of the next edit.

I would use `GEMINI.md` for Gemini-specific guidance, especially if the team actively uses Gemini CLI. I would not make it the only source of truth unless the whole team has standardized on Gemini.

## Cursor rules

Cursor has moved beyond the old `.cursorrules` pattern.

The newer system uses `.cursor/rules/*.mdc` files. Those rules can include metadata and activation behavior, which makes them better suited for scoped instructions. A rule can apply to a specific part of the codebase instead of loading for every prompt.

That is the right direction.

Always-on root instructions are blunt. Scoped rules are sharper. If you have special guidance for database migrations, React components, test files, or API routes, it is better to attach that guidance to those paths than to make the agent carry it everywhere.

Old `.cursorrules` files still show up in a lot of repos. They are not useless, but they can turn into a junk drawer.

If a rule only matters for one folder, it should not live in a global file.

## GitHub Copilot instructions

GitHub Copilot uses `.github/copilot-instructions.md` for repository custom instructions.

This file is useful because it sits where teams already put GitHub-specific project metadata. It can tell Copilot how to build, test, and validate changes inside the repo.

The tradeoff is portability. Other agents may ignore it.

That does not make it bad. It means you should treat it as Copilot-specific adapter text. If the same rule matters to every agent, put it in `AGENTS.md` first and reference or mirror only the parts Copilot needs.

## Windsurf, Zed, Aider, and the rest

Windsurf has workspace rules and global rules. Zed supports project rules and newer instruction concepts. Aider commonly uses `CONVENTIONS.md` or manually added files, plus `.aider.conf.yml` and `.aiderignore`.

The names differ, but the pattern is familiar:

- one file for global preferences
- one file for repo-level context
- one system for scoped rules
- one ignore file to keep noisy files out of context

This is where the ecosystem is heading. Every tool needs a way to persist project knowledge. Every tool also needs a way to avoid loading too much of it.

The tools that get scoped loading right will age better than the tools that only support one giant instruction blob.

## SYSTEM.md

`SYSTEM.md` is the one I would be most careful with.

The name sounds authoritative. In LLM terminology, a system message sits above user prompts. It defines the assistant's role, constraints, and safety boundaries.

A file named `SYSTEM.md` does not automatically have that authority.

Unless the tool explicitly reads `SYSTEM.md` and injects it as a system-level instruction, it is only a Markdown file with an ambitious name.

That does not mean it is useless. A `SYSTEM.md` can be valuable as a human-maintained document for base runtime behavior:

- what the agent is allowed to do
- what tools it can use
- what safety rules matter
- what actions require confirmation
- how it should recover from failures
- what it must never modify

But you should be honest about what it is.

If your tool does not officially support `SYSTEM.md`, then `SYSTEM.md` is architecture documentation. It is not a system prompt.

That distinction matters. Teams can get a false sense of safety from a filename. The model only follows instructions it actually receives.

## DESIGN.md

`DESIGN.md` is different from the agent-specific files.

It is usually not about agent behavior. It is about product behavior.

A good `DESIGN.md` gives AI tools a stable source for visual decisions:

- color tokens
- spacing scale
- typography rules
- component patterns
- motion rules
- accessibility expectations
- responsive breakpoints
- brand voice

This is especially useful because AI-generated UI tends to drift. It adds gradients. It invents colors. It changes spacing. It reaches for component-library defaults that do not match the site.

A design file gives the agent something concrete to obey.

In my own site, the equivalent is `STYLEGUIDE.md`. It defines the visual language: dark, minimal, terminal-inspired, no decorative noise. That matters more than another prompt saying "make it look good."

For UI work, `DESIGN.md` or `STYLEGUIDE.md` should be referenced by the project instructions. The agent needs to know the file exists before it can follow it.

## SKILL.md

`SKILL.md` is a different category again.

It is not general project memory. It is task-scoped procedure.

A skill file tells an agent how to perform a recurring job: review code, deploy to Vercel, parse a document, write a blog post, audit SEO, investigate logs.

That makes skills useful for workflows that should not always be loaded. You do not need deployment instructions in context while editing a button. You do need them when the user says, "deploy this."

This is the distinction I wish more teams made:

- project instructions belong in always-available files
- task procedures belong in skills
- design constraints belong in design docs
- tool-specific quirks belong in tool-specific files

When everything goes into one root Markdown file, the agent carries too much and follows too little.

## Ignore files matter too

Instruction files tell the agent what to read. Ignore files tell it what not to read.

That second part matters more than people think.

Gemini has `.geminiignore`. Aider has `.aiderignore`. Other tools respect `.gitignore` or provide their own exclusion rules.

Use them.

Generated files, build output, lockfile noise, vendor directories, coverage reports, and large logs can all waste context or confuse search. If the agent does not need a file to make a good edit, it should not be eager to read it.

Context engineering is not only about adding better instructions. It is also about removing bad inputs.

## My practical recommendation

If I were setting up a repo today, I would start with this:

1. `AGENTS.md` for shared project instructions.
2. `STYLEGUIDE.md` or `DESIGN.md` for visual/product rules.
3. Tool-specific files only when the team actually uses that tool.
4. Scoped rules for folders that need special handling.
5. Skills for repeatable workflows.
6. Ignore files for generated or noisy content.

Then I would audit the setup every month.

Instruction files rot. Commands change. Tests move. Styling rules get replaced. A file that was helpful in March can be actively harmful in June.

The best instruction file is not the longest one. It is the one that still matches reality.

## The real question

People tend to ask which file they should use.

That is the wrong starting point.

Start with the loading behavior and authority level.

If a file is always loaded, keep it short. If a rule only applies to one directory, scope it. If a workflow only matters sometimes, make it a skill. If a file is only documentation, do not pretend it is a system prompt.

AI coding tools are converging on Markdown as their instruction layer. They have not converged on meaning.

Until they do, the safest approach is boring: use portable files for shared rules, tool-specific files for tool-specific behavior, and keep every instruction close to the work it actually affects.
