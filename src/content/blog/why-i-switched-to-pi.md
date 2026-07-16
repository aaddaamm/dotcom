---
title: 'Why I Switched to pi (And Why Most CLI Agents Are Built Backwards)'
seoTitle: 'Why I Switched to pi — Adam Robinson'
description: "Most CLI coding agents ship opinionated features you can't change. Pi takes the opposite approach: a minimal core you extend around your own workflow."
date: '2026-04-20'
updated: '2026-07-16'
tags: ['ai', 'developer-tools', 'productivity']
published: true
status: 'ready'
reviewed: true
---

There's a moment with every CLI coding agent where the tool stops fitting and starts shaping. You hit a wall: a permission flow you can't customize, a context strategy you can't override, or a provider you're locked into. The tool was designed for someone's workflow, and it isn't yours.

I hit that wall with Claude Code. Then I found pi.

---

## The Opinionated Agent Problem

Claude Code is polished. Codex is fast. Aider's been around long enough to have opinions about everything. Good tools, all of them. But they share an assumption: the tool knows what you need.

Each feature comes with one implementation: sub-agents, permission gates, plan mode, MCP, and context loading. You can observe some of it, but you can't change much.

Day one, this is great. Install, authenticate, prompt. Zero friction. By week three you're routing around the tool instead of working with it. You want sub-agents that behave differently. Permissions that match your actual deployment environment. The ability to switch models mid-conversation because Claude handles your backend better than your frontend.

You can't. Not without forking.

## Pi's Bet

Pi ships four tools: `read`, `write`, `edit`, `bash`. No sub-agents, no plan mode, no permission system, no MCP. Features other tools bake in can be built as extensions, loaded as skills, or installed from packages.

Sounds like a limitation until you see what it enables.

Pi's extension system lets me choose the implementation. I can spawn pi instances as sub-agents, run them in tmux panes, add confirmation before destructive commands, or write plans to a file. Each flow can match my workflow instead of a generic default.

## Less Bloat, More Signal

One thing that struck me immediately: pi is lean in a way that Claude Code isn't. Claude Code ships a heavy system prompt, a permission framework, MCP plumbing, sub-agent orchestration, and a bunch of internal tooling before you've typed a word. That's context budget spent on features you might not use. It's also compute you're paying for.

Pi's system prompt is minimal. Four tools, basic instructions, done. Everything else is opt-in. You load what you need and nothing else. The result is more of your context window available for actual work, and less money burned on token overhead you never asked for.

This matters more than it sounds. When you're deep in a long session and the model starts drifting, it can be because the context is full of stuff that isn't helping. A leaner baseline means you hit that wall later or avoid it entirely.

## Seeing What the Agent Sees

Here's something that frustrated me about Claude Code: you're left guessing what the tool is doing. It loads context files silently. It makes decisions about which tools to call and you see the result, but the path it took to get there is partially hidden. When something goes wrong, you're reverse-engineering the agent's reasoning from its output.

Pi shows you everything. Tool calls, their inputs, and their outputs all appear in the conversation stream. When the model reads a file, you see it read the file. When it runs a command, you see the command and the result. The startup header tells you exactly which context files, extensions, skills, and prompt templates are loaded. Nothing is hidden, nothing is inferred.

This sounds minor until you're debugging a bad edit three turns deep and you need to understand why the model made a decision. In Claude Code, that's archaeology. In pi, you scroll up.

The footer shows token usage, cost, and context utilization in real time. You can decide to `/compact` or start a fresh session with `/new` before the context becomes a problem.

## Hot Reloading

This one's small but it changed how I work with the tool.

Extensions, skills, prompt templates, and themes all hot-reload with `/reload`. Change a file, reload, and it's live. No restart, lost session, re-authentication, or context setup. You're iterating on your tooling the same way you iterate on your code.

Themes hot-reload automatically, without the command. Modify the file and pi picks it up instantly.

When you're building a custom extension, such as a permission gate or deployment tool, you're developing it inside the tool that runs it. Write the extension, reload, test it with a real prompt, adjust, and reload again. The feedback loop takes seconds.

## What Actually Sold Me

### Provider freedom

Claude Code locks you to Anthropic. Codex locks you to OpenAI. Pi works with twenty-plus providers, including Anthropic, OpenAI, Google, Mistral, Groq, xAI, OpenRouter, Azure, and Bedrock. Authenticate once, then switch models with Ctrl+L, even mid-conversation.

I switch models based on the task. Some handle large refactors better. Some are faster for small edits. Some are cheaper for exploratory work where perfection doesn't matter. With one provider, I have fewer options when those strengths differ.

### Session branching

Most tools give you linear sessions. Maybe you can fork. Pi stores everything as a JSONL tree with parent IDs, and you navigate it in-place with `/tree`. Jump to any previous point, continue from there, and switch between branches in one file.

Try three approaches to the same refactor, compare results, continue from whichever worked. You don't lose the others. It's version control for conversations.

### Extensions

Extensions are TypeScript modules that can register custom tools, intercept tool calls, subscribe to lifecycle events, add UI components, register commands, and persist state across sessions.

A permission gate that blocks writes to `.env` is ten lines. Auto-commit after every turn is twenty. An interactive deployment wizard works in the same system. Someone even built Doom inside pi as a proof of concept.

### Skills and packages

Skills are Markdown files that describe a workflow for the agent to load when relevant. They follow the open [Agent Skills standard](https://agentskills.io), so they're portable across tools.

Packages bundle extensions, skills, prompts, and themes into installable units:

```bash
pi install npm:@someone/pi-tools
pi install git:github.com/user/their-workflow
```

Someone builds a useful code review extension, packages it, and you install it in one command. You can remove or fork the package later.

### Context without vendor lock-in

Pi loads `AGENTS.md`, a convention not branded to any provider. It also reads `CLAUDE.md` for compatibility, but the default naming reflects the stance that project context shouldn't be tied to one vendor's tool.

Loading is predictable: global file, parent directories up from cwd, current directory. All concatenated. No silent subdirectory loads triggered by file reads that you didn't anticipate. If you've read [my post on context accumulation](/blog/claude-has-more-context-than-you-think), you know why that matters.

## The Trade-offs

I'm not going to pretend there's no cost.

**Onboarding is steeper.** Claude Code works the second you install it. Pi works too, but getting the most out of it means understanding extensions, skills, and how to shape the tool. If you want something that works with zero thought, the opinionated tools are genuinely good at that.

**You build more yourself.** You have to write that sub-agent system or find a package. The same is true for plan mode. If you like thinking about your tooling, this is a feature. If you'd rather never think about your agent and ship product, it's overhead.

**Smaller ecosystem.** Claude Code has Anthropic behind it. Aider has years of contributions. Pi is newer. The packages that exist are solid, but there are fewer of them. This is changing fast, but it's honest to say you'll find fewer drop-in solutions today.

## Who This Is For

The argument isn't that pi is universally better. It's that these tools serve different mindsets.

If you want polished, zero-config defaults and you're fine within their constraints, Claude Code or Codex will serve you well. They're good products doing what they set out to do.

Pi is aimed at people who want to change the permission flow, switch providers mid-task, build custom tools without forking, share workflow automation as installable packages, or see what the agent is actually doing.

The best coding agent is the one that fits how you actually work. For me, that's the one that lets me define what that means.

---

## See It in Action

IndyDevDan did a [deep dive on pi's agent system and the application itself](https://www.youtube.com/watch?v=f8cfH5XX-XU) that's worth watching if you want to see the extension model and workflows in practice. And if you're curious about the philosophy behind why pi exists at all, Mario Zechner (pi's creator) gave a talk called ["Building pi in a World of Slop"](https://youtu.be/RjfbvDXpFls?si=j6n0ffbBJ7O5_oDp) that lays out the case for a minimal, extensible agent in contrast to Claude Code's approach.

---

Pi is open source, MIT licensed, one install:

```bash
npm install -g @mariozechner/pi-coding-agent
```

[GitHub](https://github.com/badlogic/pi-mono) · [Discord](https://discord.com/invite/3cU7Bz4UPx) · [Docs](https://shittycodingagent.ai)
