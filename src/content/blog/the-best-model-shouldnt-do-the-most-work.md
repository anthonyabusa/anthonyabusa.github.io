---
title: "The Best Model Shouldn't Do the Most Work"
description: "When you get a frontier model, the instinct is to hand it everything. The economics and the architecture argue for the opposite."
pubDate: 2026-06-13
tags: ["AI", "Systems", "Strategy"]
draft: false
---

The first time you get access to a frontier model, the temptation is to hand it the whole workshop. It is the smartest thing in the room, or at least the most obviously capable one, so the responsible move can feel self-evident: route everything through it, let raw capability swallow the mess, and call the bill a cost of doing serious work. I ran my system that way for about a week. Every draft, every file rename, every three-line summary, every bit of procedural shrapnel went through the most capable and most expensive model I had. A week was enough for the premise to indict itself, first quietly, then all at once, because eventually the invoice stops being an abstraction and starts behaving like telemetry.

The part people understate when they talk about building with agents is that most of what an agent actually *does* is not deep thought. It is volume. Reformatting a file, drafting boilerplate, grepping a directory, summarizing a log, renaming a variable across forty places: the day fills with **toil tokens**, and paying frontier rates for toil tokens is the operational equivalent of flying your most senior partner across the country to photocopy a contract. They can do it. They will probably do it cleanly. But you have confused capability with purpose, and that is how expensive systems learn to waste themselves while sounding impressively intentional.

Picture the kitchen. The head chef who insists on peeling every potato is not protecting standards; they are turning judgment into a blockage while wearing the costume of diligence. The line slows to the pace of the one person who refuses to delegate. The dish that actually needs their taste, the sauce that breaks if the heat is wrong, sits waiting while they keep peeling. That is the argument in one image: the scarce resource was never model intelligence in the abstract. It was the judgment you were spending through it.

So I rebuilt the system around a different shape. One high-judgment model orchestrates: it decides what needs to happen, in what order, and whether the result is actually right. Under it, a set of cheap local models running on my own hardware at zero marginal cost handles the volume. The expensive mind plans the migration and reviews the diff; the cheap hands type it out. Judgment stays at the top, where it compounds, and toil sinks to the bottom, where it is nearly free. The tokens still get spent. They just stop getting spent as if every task deserves a board meeting.

The obvious concern is that cheaper models drag the output down. In practice, they do not, because they are not being asked to make the decisions. They draft; the orchestrator decides. A weak writer with a strong editor ships better work than a strong writer with no editor, and the architecture forces that pairing into the system instead of leaving it to mood, memory, or late-night discipline. The system is not smarter than its best model. It is smarter than its best model working alone, which is a narrower claim, but a more useful one.

This is the part I keep coming back to, because it is not really about models. It is about one of the oldest mistakes in operations: confusing motion with leverage. We measure people by how much they personally produce, then act surprised when the most capable people become the most clogged. The answer is not to make them faster. The answer is to stop pointing them at work that does not need them, and to design the system so the rare thing is spent only on the rare problem.

Goals will not get you there; systems will. "Use the expensive model less" is a goal, and goals decay the moment you are tired, rushed, or trying to get one last thing shipped at 11pm. An architecture that makes the cheap path the default, and routes to the expensive one only when judgment is genuinely required, holds because it does not depend on discipline in the moment. You built the discipline into the walls.

There is a real risk here, and pretending otherwise would just recreate the overconfidence the architecture is trying to correct. The failure mode is not cheap hands producing sloppy work. The failure mode is a judgment call getting misrouted *down*, sent to the volume tier because it looked like toil when it was not. A migration that quietly needed a decision, drafted by a model that was never asked to decide, can ship a confident mistake. The defense is not to route everything back up to the expensive mind, because that simply rebuilds the bottleneck with better branding. The defense is to make the orchestrator's non-negotiable job the sorting itself, so the one thing it is never allowed to delegate is deciding what can be delegated.

So the smartest thing you can do with the smartest model is guard it. The point was never how much the best mind in the room can do, but how little of it you can afford to waste. The question for anyone building with these tools is not "how powerful is your model?"

It is: what is it doing right now that something cheaper should be doing instead?
