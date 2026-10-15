---
title: "A Smarter Model Won't Fix a Missing Process"
description: "I published the skills I use to take an idea to shipped work with an agent. The value is not in any one skill; it is in how each hands its output to the next."
pubDate: 2026-10-15
tags: ["AI", "Systems", "Agents"]
draft: false
---

Most agent failures I see are process failures, not model failures. Picture handing an agent a feature request at nine in the morning. By lunch it has built something; the idea was never checked against what you actually needed, two decisions that were yours to make were quietly made for you, the tests were written after the code (shaped, conveniently, to pass it), and the summary at the end says "done" about work that was never run. The model reasoned fine at every step. If the model were the bottleneck, the next release would fix this; it won't, because a smarter model running the same missing process just arrives at the wrong place sooner.

So I wrote my process down in a form an agent can follow, and published it at [github.com/anthonyabusa/skills](https://github.com/anthonyabusa/skills).

## What a skill is, and why twenty-one of them are really one

A skill is a short instruction file an agent loads when a task matches it: when to use it, when not to, the steps, and a "done when" list that can be checked. Claude Code and Codex both read the same format, so a skill written once travels with you.

There are twenty-one in the repo. Read individually they look like a toolbox. They were built to be read as a pipeline, where each stage hands something concrete to the next:

| Stage | Skills | Hands forward |
|---|---|---|
| 0 Vet | vet-idea | a go or no-go verdict, in the task store |
| 1 Shape | question-first, research | every build-changing question, answered once and saved |
| 2 Map | decision-map | a short list of decisions, each routed to me, to research, or to a spike |
| 3 Plan | plan | a written plan with a premortem, approved |
| 4 Slice | decompose | thin vertical slices with explicit dependencies |
| 5 Build | red-first, fix, build-graph, guardrails, human-step | changes a failing test asked for |
| 6 Ship | pr-brief, honest-signoff, close-out | a PR that states its evidence, and an honest sign-off |
| 7 Learn | correction-loop, retro, write-skill | a fixed rule, not just a fixed instance |

None of these stages is new. Any good engineering team runs some version of them, mostly out of habit and a little out of scar tissue. What an agent lacks is the habit, and a habit is exactly the thing you can write down.

## The front half, so the agent stops guessing

The first four stages produce no code, which is precisely why agents skip them. Vet asks whether the idea is worth building and writes the verdict down, so a no is a decision on record instead of a feeling that fades by Thursday. Shape collects every question that would change the build and asks them in one batch, each with a recommended default; I answer once instead of being interrupted six times across an afternoon. Map sorts whatever fog remains into three piles: mine to decide, worth researching, cheaper to learn with a throwaway spike.

By the time the plan is written, the agent is reading context rather than inventing it. The plan has to cite real files in the repo, carry a premortem when the work is risky (assume it shipped and failed three months from now, then name why), and survive four quick lenses: owner, engineer, user, operator. Decompose cuts it into slices small enough for one session, each with its own definition of done and an explicit list of what it waits on.

## The back half, so "done" means something

Build is where agents are already strong, and also where they cut corners most politely. Red-first makes a test fail for the right reason before any implementation exists. Fix refuses the band-aid and goes after the root cause. Guardrails puts a check in front of anything destructive (a recursive delete, a force push, a dropped table) and takes the reversible path when the check finds something to lose. Human-step turns the parts only a person can do, a sign-in or a console click, into exact instructions plus a probe that proves it happened.

Ship is the honesty layer, and the one I care about most. Every agent I have worked with is fluent in done-theater: the confident summary, the green checkmark, the "should work now." The sign-off skill separates what was verified (evidence the agent produced itself) from what was merely attempted, and makes it name the rung it reached; merged is not deployed, and deployed is not live. Learn closes the loop. When I correct an agent, the correction has to fix the rule that produced the mistake, or the same mistake returns next week wearing a different file name.

## The chain is the product

The output of each stage is the input to the next: a verdict becomes questions, questions become decisions, decisions become a plan, the plan becomes slices, slices become failing tests, tests become evidence, evidence becomes a sign-off, and a bad sign-off becomes a correction. Remove a link and the stage after it starts guessing again, which is the failure the whole chain exists to prevent.

A small example from this week, and a slightly embarrassing one. The system that suggests skills to my own sessions was measuring its adoption wrong; it counted only one of the ways a skill can be invoked, so every command I typed by hand looked unused. I diverge only to note the irony: the tool built to keep my process honest had a process gap of its own. The fix ran through the back half of the pipeline. A test reproduced the miscount first, then the fix landed, the PR stated its evidence, and the sign-off said plainly that the earlier number could not be recovered, rather than quietly publishing a corrected one.

Not every request needs every stage; a typo fix goes straight to build. For everything in between, the `ask` skill names what a request needs and which stages it can skip, and why.

## Credit, and getting started

Several of these began as adaptations of work I learned from: Matt Pocock's skills, Jesse Vincent's superpowers, Garry Tan's gstack, BMAD, SuperClaude and GitHub's spec-kit. Mine have diverged, and each skill names its source. They are MIT licensed. In Claude Code:

```
/plugin marketplace add anthonyabusa/skills
/plugin install skills@anthonyabusa
```

For Codex and other agents, copy the folders into `.agents/skills/`, then run `setup` once per repo to decide where tasks live.

A capable model will do one step brilliantly. Trust is earned on the second step, and kept on the tenth.
