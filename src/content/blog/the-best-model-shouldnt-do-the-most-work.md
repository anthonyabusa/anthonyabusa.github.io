---
title: "The Best Model Shouldn't Do the Most Work"
description: "When you get a frontier model, the instinct is to hand it everything. The economics and the architecture argue for the opposite."
pubDate: 2026-06-13
tags: ["AI", "Systems", "Strategy"]
draft: true
---

When you finally get your hands on a frontier model, the instinct is to hand it everything. It is the smartest thing in the room, so surely the move is to let it do the most. I ran my whole system that way for about a week: every draft, every file rename, every three-line summary routed to the most capable and most expensive model I had. About a week was all it took for the logic to quietly invert, because that is when the bill arrives.

Here is the thing nobody tells you when you start building with agents: most of what an agent actually *does* is not thinking. It is volume. Reformatting a file, drafting boilerplate, grepping a directory, summarizing a log, renaming a variable across forty places. The work that fills the day is overwhelmingly **toil tokens**, and paying frontier rates for toil tokens is like flying your most senior partner across the country to photocopy a contract. They *can*. They will even do it well. But you have confused what someone is capable of with what they are *for*.

Picture the kitchen. The head chef who insists on peeling every potato is not being diligent; they are being a bottleneck wearing the costume of diligence. The line slows to the speed of the one person who refuses to delegate. The dish that needed their judgment, the sauce that breaks if the heat is wrong, waits while they peel. That image is the whole argument: the scarce resource was never the model's intelligence, it was the judgment you were spending it on.

So I rebuilt around a different shape. One high-judgment model orchestrates; it decides what needs to happen, in what order, and whether the result is actually right. Underneath it, a set of cheap local models running on my own hardware at zero marginal cost do the volume. The expensive mind plans the migration and reviews the diff; the cheap hands type it out. Judgment stays at the top, where it compounds, and toil sinks to the bottom, where it is nearly free. The toil tokens still get spent; they just stop getting spent at frontier rates.

Though you would assume the cheaper models drag the output down, they do not, because they never make the decisions. They draft; the orchestrator decides. A weak writer with a strong editor ships better work than a strong writer with no editor, and the structure enforces the pairing on every single task. The system is not smarter than its best model. It is smarter than its best model *working alone*, which is a different and more useful thing.

This is the part I keep coming back to, because it is not really about models. It is about the oldest mistake in operations: confusing motion with leverage. We measure people by how much they personally produce, then act surprised when our most capable people are also our most clogged. The fix is never to make them faster. It is to stop pointing them at work that does not need them, and to design a system where the rare thing is spent only on the rare problem.

Goals do not get you there; systems do. "Use the expensive model less" is a goal, and goals decay the moment you are busy. An architecture that makes the cheap path the default and routes to the expensive one only when judgment is genuinely required holds, because it does not depend on your discipline at 11pm. You built the discipline into the walls.

Despite all of that, the architecture carries its own risk, and pretending otherwise would be the same overconfidence I am warning against. The failure mode is not the cheap hands producing sloppy work; it is a judgment call that gets mis-routed *down*, sent to the volume tier because it looked like toil when it was not. A migration that quietly needed a decision, drafted by a model that was never asked to decide, ships a mistake with confidence. The defense is not to route everything back up to the expensive mind, which just rebuilds the bottleneck; it is to make the orchestrator's one non-negotiable job the sorting itself, so the only thing it is never allowed to delegate is deciding what can be delegated.

So the smartest thing you can do with the smartest model is to guard it. The point was never how much the best mind in the room can do, but how little you can afford to waste it on. The question for anyone building with these tools is not "how powerful is your model?"

It is: what is it doing right now that something cheaper should be doing instead?
