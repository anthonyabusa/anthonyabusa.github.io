---
title: "ReAct: Synergizing Reasoning and Acting in Language Models"
authors:
  - "Yao et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "read"
cover: "/covers/react-reasoning-acting.png"
synopsis: "ReAct, published at ICLR 2023 by researchers from Princeton University and Google Research, proposes a prompting paradigm that interleaves verbal reasoning traces with concrete task actions in large language models. By alternating thoughts and actions in a single coherent trajectory, ReAct allows models to dynamically update plans, retrieve external information, and produce more interpretable and grounded decision-making compared to reasoning-only or action-only baselines."
takeaways:
  - "ReAct augments the standard action space of an LLM agent with a language space for generating free-form reasoning traces, called thoughts, which do not produce environment observations but instead compose useful context, track progress, and guide subsequent actions in an interleaved sequence."
  - "On the HotpotQA multi-hop question answering benchmark using PaLM-540B, the combined ReAct to CoT-SC strategy achieves an exact match score of 35.1, compared to 33.4 for CoT-SC alone and 25.7 for act-only prompting, demonstrating the benefit of combining internal and external knowledge."
  - "On the FEVER fact verification benchmark, ReAct achieves an accuracy of 60.9 with PaLM-540B prompting, compared to 56.3 for chain-of-thought and 58.9 for act-only, showing that grounding claims against retrieved Wikipedia evidence reduces false positives."
  - "On two interactive decision-making benchmarks, ALFWorld and WebShop, one or two-shot ReAct prompting outperforms imitation and reinforcement learning methods trained on 10,000 to 100,000 task instances, achieving absolute success rate improvements of 34% and 10% respectively."
  - "An error analysis on HotpotQA finds that hallucination accounts for 56% of CoT failures but 0% of ReAct failures, while ReAct introduces a distinct reasoning error mode where the model loops on prior thoughts when search results are uninformative."
  - "When fine-tuned on just 3,000 bootstrapped trajectories, smaller PaLM-8B and 62B models with ReAct outperform all PaLM-540B prompting methods on HotpotQA, suggesting that the reasoning-and-acting paradigm transfers well to fine-tuning regimes."
sourceUrl: "https://arxiv.org/abs/2210.03629"
notionId: "3a0176cc-7864-8137-ba9a-eb1fce527cda"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---

What ReAct really settles is that separating reasoning from action was always artificial. A plan you can't act on and revise as the world answers back isn't a plan, it's a guess dressed up as one; interleaving thought and action in a single trajectory is what turns a model from a chatbot into an agent. The second win is the one people undersell: because the trajectory is a legible trace of thoughts and actions, you can read why the agent did what it did. That is the whole difference between a system you can debug and one you can only pray to. An agent that reasons in the open, step by step against what it just observed, is one you can actually hold accountable. Do the thinking and the doing in one loop, and make that loop something a human can read.
