---
title: 'Where I Fit In with Agentic Workflows'
description: 'AI seems to have a role at every stage of software development. I’m questioning why removing the engineer from the process has become the goal.'
date: '2026-09-17'
tags: ['ai', 'software-engineering', 'agentic-workflows']
published: false
status: 'draft'
reviewed: false
---

I'm having a harder time figuring out where I fit in the work I know how to do.

Look at the ambition behind an end-to-end agentic workflow. An agent helps define the requirements. Another proposes the architecture. Agents write the implementation, generate the tests, review the changes, and prepare the release. Coordination becomes another job for an agent.

I keep looking at that process and trying to squeeze myself into a spot. After more than fifteen years of building software, that's a strange position to be in.

But I'm also starting to question the goal. Why does the ideal version of this workflow seem to be the one with the least engineer involvement?

## Automation needs a reason

I understand wanting to remove tedious work. There's plenty of it in software development. I use AI tools, and I want them to be useful. I don't need to type every line myself to feel that I've contributed.

What bothers me is treating every human interaction as friction to eliminate.

A question that changes the scope slows the workflow down. So does discovering that the proposed abstraction doesn't fit the business, or deciding a feature isn't worth its maintenance cost. Those interruptions can be the most useful things that happen during development.

If the goal is an uninterrupted trip from ticket to merged code, an engineer who stops the process can look like the bottleneck. The workflow needs a way to distinguish an unnecessary delay from someone preventing a bad decision.

Completing more stages automatically doesn't tell us whether we've made that distinction. It tells us we've automated more stages.

## A complete pipeline can still share one wrong assumption

Consider a feature request with an important ambiguity. The implementation agent chooses an interpretation. The test-writing agent gets the same request and the implementation. The review agent checks the resulting diff against that request.

Everything can agree.

The implementation can satisfy the tests. The review can find no discrepancy. The original misunderstanding can survive the entire process because nothing introduced the missing context.

A human team can make the same mistake. Adding people doesn't guarantee useful disagreement, and an agent may catch a problem a person missed. That's exactly why counting reviewers or completed checks isn't enough. We need to know what evidence each check adds.

Calling one agent an architect and another a reviewer doesn't establish that independence. Giving them separate roles may help, but I want to see what makes one capable of challenging the assumptions the others accepted.

A green pipeline is evidence about the checks we ran. It shouldn't end the discussion about whether we built the right thing.

## Moving me “up a level” doesn't answer the question

The reassuring response is that engineers will move up a level. We'll define the problem, design the system, or coordinate the agents.

Those are also activities we're trying to automate.

I don't find much comfort in being assigned the next task on the automation roadmap. More importantly, separating technical judgment from implementation misunderstands how I developed that judgment.

At Shell, my work included an onsite Design Sprint to define the MVP and building the React and Node.js application. At Healthcasts, it included helping define technical approaches and implementing changes across publishing and authentication.

The decisions and the implementation belonged to the same work. Building exposed details that mattered to the approach. Understanding the approach mattered when writing the code.

I want agents involved in that process. I also want to stay close enough to the implementation to notice when the plan stops making sense.

An arrangement where I approve a proposal, wait for a large diff, and accept responsibility for the result needs more justification than “you can focus on higher-level work.” Understanding a large change is work. Maintaining enough context to challenge it is work. Neither disappears because generating the change got faster.

## We're delegating part of how engineers learn

There's another question I don't think a throughput argument answers.

How do we expect engineers to develop judgment if the intended workflow removes them from the experiences that build it?

My career started at Beacon Mutual with deployment and environment management before moving into development. Working across production support, releases, databases, and business systems gave me context I carried into later consulting work.

I wouldn't prescribe every manual task from that period as a training exercise. Some work deserves to disappear. But a workflow that delegates implementation, diagnosis, and review needs a deliberate way for people to learn what those activities used to teach them.

“Review the agent's output” assumes the reviewer already knows what to look for. For someone still building that knowledge, a plausible explanation and passing tests may be difficult to challenge.

I want a better answer to that than telling people to become better at prompting.

## I want involvement that changes the result

I don't want a ceremonial approval step added so we can say a human is still involved. I want enough access, context, and time to make a useful decision, including a decision to stop or change the work.

That means evaluating the workflow by more than how little it asks of me. Did we solve the actual problem? Can the team explain the change? Can we operate it, modify it, and recover when it fails? Did anyone learn enough to make the next decision better?

I don't know exactly where my role will settle. I expect it to change, and I want to keep using tools that help me build.

But I shouldn't have to defend my place by finding the last task an agent can't do. Before we work out how to remove the engineer from another stage, we should be able to explain what gets better when we do.
