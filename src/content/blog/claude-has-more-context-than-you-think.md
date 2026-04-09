---
title: 'Your AI Agent Is Reading More Than You Think'
description: "Claude Code and other agentic tools gather far more context than you explicitly hand them. Here's how the CLAUDE.md hierarchy works — and what to do about it."
date: '2026-04-03'
tags: ['ai', 'developer-tools', 'claude']
published: true
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

When the agent traverses your repository to work on a task, it doesn't pick one file and ignore the rest. It loads your root file first, then picks up each domain file as it enters that folder. Touch six domains in a single task and you've silently loaded seven files before the agent has written a single line of code. That 400-line file you broke up into ten 40-line files? The agent may load all ten. You've gone from one big file to ten smaller ones that collectively add up to more than you started with.

The problem was never the size of the file. It was never even the number of files. It's what's in them, and when they get loaded.

## How the Hierarchy Works

Here's the hierarchy. At the root of your repository sits your main CLAUDE.md — the agent loads this first, every time. As it moves into subfolders, it picks up any CLAUDE.md file it finds there too. Go deeper and the same thing happens again. Root → domain → subdomain. Every folder entered is another file added to the stack, and the stack grows silently as the agent works.

## The Visibility Problem

Here's the uncomfortable part. You have no easy way to see what the agent has loaded. There's no list that appears at the start of a session, no indicator showing how much of your context window is already occupied before you've typed a single prompt. The agent is working with instructions you wrote, plus instructions you forgot about, plus instructions from domain files you haven't touched in weeks. It's all in there, and it's all influencing what the agent does.

## So What Can You Do?

Quite a lot, it turns out.

The official guidance from Anthropic is blunt on this point: keep your CLAUDE.md short and human-readable, and for each line ask yourself "would removing this cause Claude to make mistakes?" — if not, cut it. That's the first lever. A lean file that gets loaded everywhere does less damage than a bloated one.

The second lever is how you scope your tasks. The agent only loads domain files in folders it actually enters — so a tightly scoped task naturally limits accumulation. Before you send a prompt, ask yourself which parts of the codebase the agent actually needs to touch. The answer is usually smaller than your instinct suggests.

The third lever is context management during a session. Running `/clear` between unrelated tasks resets the context window entirely. If you notice the agent starting to drift or repeat mistakes, that's often a sign the context is cluttered — not that the agent is broken. A fresh session with a better prompt will almost always outperform a long session with accumulated noise. If you're mid-task and don't want to start over, `/compact` is a middle ground — it summarizes the conversation so far and replaces it with that summary, keeping enough context to continue without carrying the full weight of everything that came before.

And finally, for tasks that require genuine exploration across many domains, subagents are one of the most powerful tools available — they run in separate context windows and report back summaries, keeping your main conversation clean. The exploration happens, but the cost doesn't come out of your primary context.

---

The mental model shift is simple but important: every folder the agent enters is a file it may read. That changes how you should think about scoping tasks, structuring instructions, and what you put in those files in the first place.
