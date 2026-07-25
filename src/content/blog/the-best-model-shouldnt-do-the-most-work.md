---
title: "The Best Model Shouldn't Do the Most Work"
description: "When you get a frontier model, the instinct is to hand it everything. The economics and the architecture argue for the opposite."
pubDate: 2026-06-13
tags: ["AI", "Systems", "Strategy"]
draft: false
---

When you first get access to a frontier model, the instinct is to hand it the whole shop. It is the smartest thing in the room, so the obvious move seems to be letting it do as much as possible. I ran my system that way for about a week: every draft, every file rename, every three-line summary routed through the most capable and most expensive model I had. A week was enough for the logic to quietly reverse itself, because eventually the invoice stops being theoretical.

The part nobody tells you when you start building with agents is that most of what an agent actually *does* is not thinking. It is volume. Reformatting a file, drafting boilerplate, grepping a directory, summarizing a log, renaming a variable across forty places. The day is full of **toil tokens**, and paying frontier rates for toil tokens is like flying your most senior partner across the country to photocopy a contract. They can do it. They will probably do it well. But you have confused what someone is capable of with what they are for.

Picture the kitchen. The head chef who insists on peeling every potato is not being diligent; they are becoming a bottleneck in the costume of diligence. The line slows to the pace of the one person who refuses to delegate. The dish that actually needs their judgment, the sauce that breaks if the heat is wrong, sits waiting while they peel. That is the whole argument in one image: the scarce resource was never the model's intelligence. It was the judgment you were spending it on.

So I rebuilt the system around a different shape. One high-judgment model orchestrates; it decides what needs to happen, in what order, and whether the result is actually right. Underneath it, a set of cheap local models running on my own hardware at zero marginal cost handles the volume. The expensive mind plans the migration and reviews the diff; the cheap hands type it out. Judgment stays at the top, where it compounds, and toil sinks to the bottom, where it is nearly free. The toil tokens still get spent. They just stop getting spent at frontier rates.

You would assume the cheaper models drag the output down. In practice, they do not, because they are not making the decisions. They draft; the orchestrator decides. A weak writer with a strong editor ships better work than a strong writer with no editor, and the architecture forces that pairing into every task. The system is not smarter than its best model. It is smarter than its best model working alone, which is a narrower claim, but a much more useful one.

This is the part I keep returning to, because it is not really about models. It is about one of the oldest mistakes in operations: confusing motion with leverage. We measure people by how much they personally produce, then act surprised when the most capable people become the most clogged. The fix is not to make them faster. The fix is to stop pointing them at work that does not need them, and to design a system where the rare thing is spent only on the rare problem.

Goals will not get you there; systems will. "Use the expensive model less" is a goal, and goals decay the moment you are tired, rushed, or trying to get one last thing shipped at 11pm. An architecture that makes the cheap path the default, and routes to the expensive one only when judgment is genuinely required, holds because it does not depend on discipline in the moment. You built the discipline into the walls.

There is a real risk here, and pretending otherwise would be the same overconfidence the architecture is trying to correct. The failure mode is not the cheap hands producing sloppy work. The failure mode is a judgment call getting misrouted *down*, sent to the volume tier because it looked like toil when it was not. A migration that quietly needed a decision, drafted by a model that was never asked to decide, can ship a confident mistake. The defense is not to route everything back up to the expensive mind, because that just rebuilds the bottleneck. The defense is to make the orchestrator's one non-negotiable job the sorting itself, so the only thing it is never allowed to delegate is deciding what can be delegated.

So the smartest thing you can do with the smartest model is guard it. The point was never how much the best mind in the room can do, but how little of it you can afford to waste. The question for anyone building with these tools is not "how powerful is your model?"

It is: what is it doing right now that something cheaper should be doing instead?
