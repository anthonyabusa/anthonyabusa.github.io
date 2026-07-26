---
title: "The Best Model Shouldn't Do the Most Work"
description: "When you get a frontier model, the instinct is to hand it everything. The economics and the architecture argue for the opposite."
pubDate: 2026-06-13
tags: ["AI", "Systems", "Strategy"]
draft: false
---

When you first get access to a frontier model, the obvious instinct is to give it everything. It is the smartest thing in the room, so surely the correct move is to let it carry the most weight. I ran my system that way for about a week: every draft, every file rename, every three-line summary routed through the most capable and most expensive model I had. A week was enough for the logic to reverse itself, quietly and then all at once, because eventually the invoice stops being theoretical.

Here is the part people tend to skip when they talk about building with agents: most of what an agent actually *does* is not thinking. It is volume. Reformatting a file, drafting boilerplate, grepping a directory, summarizing a log, renaming a variable across forty places. The work that fills the day is overwhelmingly **toil tokens**, and paying frontier rates for toil tokens is like flying your most senior partner across the country to photocopy a contract. They *can* do it. They may even do it beautifully. But you have confused capability with purpose, which is how expensive systems learn to waste themselves.

Picture the kitchen. A head chef who insists on peeling every potato is not being diligent; they are becoming the bottleneck in a diligence costume. The line slows to the pace of the one person who refuses to delegate. The dish that actually needs their judgment, the sauce that breaks if the heat is wrong, waits while they peel. That is the whole argument in miniature: the scarce resource was never the model's intelligence, it was the judgment you were spending through it.

So I rebuilt the system around a different shape. One high-judgment model orchestrates; it decides what needs to happen, in what order, and whether the result is actually right. Beneath it, cheap local models running on my own hardware at zero marginal cost handle the volume. The expensive mind plans the migration and reviews the diff; the cheap hands type it out. Judgment stays at the top, where it compounds, and toil sinks to the bottom, where it is nearly free. The toil tokens still get spent; they just stop getting spent at frontier rates.

The natural objection is that cheaper models should drag the output down. In practice, they do not, because they are not being asked to make the decisions. They draft; the orchestrator decides. A weak writer with a strong editor ships better work than a strong writer with no editor, and this architecture forces that pairing on every task. The system is not smarter than its best model. It is smarter than its best model *working alone*, which is the more useful benchmark.

This is the point I keep returning to, because it is not really about models. It is about one of the oldest mistakes in operations: confusing motion with leverage. We measure people by how much they personally produce, then act surprised when the most capable people become the most clogged. The answer is not to make them faster. It is to stop pointing them at work that does not need them, and to design the system so the rare thing is spent only on the rare problem.

Goals will not reliably get you there; systems will. "Use the expensive model less" is a goal, and goals decay the moment the day gets crowded. An architecture that makes the cheap path the default, and routes to the expensive path only when judgment is genuinely required, holds because it does not depend on your discipline at 11pm. You built the discipline into the walls.

None of this makes the architecture risk-free, and pretending otherwise would be the same overconfidence I am arguing against. The failure mode is not cheap hands producing sloppy work; it is a judgment call getting misrouted *down*, sent to the volume tier because it looked like toil when it was not. A migration that quietly needed a decision, drafted by a model that was never asked to decide, can ship a mistake with confidence. The defense is not to route everything back up to the expensive mind, which only rebuilds the bottleneck. The defense is to make the orchestrator's one non-negotiable job the sorting itself, so the only thing it is never allowed to delegate is deciding what can be delegated.

So the smartest thing you can do with the smartest model is to guard it. The point was never how much the best mind in the room can do, but how little of it you can afford to waste. The question for anyone building with these tools is not "how powerful is your model?"

It is: what is it doing right now that something cheaper should be doing instead?
