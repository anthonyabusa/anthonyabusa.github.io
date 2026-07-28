---
title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"
authors:
  - "Wei et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "read"
cover: "/covers/chain-of-thought-prompting.png"
synopsis: "This Google Research paper investigates chain-of-thought prompting, a technique in which few-shot exemplars provided to a large language model include explicit intermediate reasoning steps alongside final answers. Experiments across arithmetic, commonsense, and symbolic reasoning benchmarks demonstrate that this approach substantially improves performance on complex tasks and that the capability emerges as a property of model scale, appearing primarily in models with roughly 100 billion or more parameters."
takeaways:
  - "Chain-of-thought prompting augments standard few-shot prompting by including a series of natural language intermediate reasoning steps in each exemplar, requiring no model fine-tuning or architectural changes."
  - "The ability to benefit from chain-of-thought prompting is an emergent property of model scale: smaller models produce fluent but illogical chains of thought and show no performance gain or even degradation, while gains appear reliably only at approximately 100B parameters and above."
  - "On the GSM8K math word problem benchmark, PaLM 540B with eight chain-of-thought exemplars achieves a solve rate of 57%, surpassing the prior best of 55% from fine-tuned GPT-3 175B with a verifier, without any task-specific training."
  - "Performance gains are largest on the most difficult multi-step problems: on GSM8K, performance more than doubled for the largest GPT and PaLM models compared to standard prompting, while single-step problems showed minimal or no gain."
  - "Ablation studies show that neither equation-only prompting nor variable-length compute alone accounts for the gains, and that providing the chain of thought only after the answer does not help, confirming that sequential intermediate reasoning in natural language is the operative mechanism."
  - "Chain-of-thought prompting is robust across different annotators, different sets of exemplars, and different exemplar orderings, and it also facilitates out-of-distribution length generalization for symbolic tasks such as coin flip tracking and letter concatenation."
sourceUrl: "https://arxiv.org/abs/2201.11903"
notionId: "3a0176cc-7864-8198-b993-e1b3c454ff07"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---

The result everyone quotes is that narrating the steps roughly doubles accuracy on hard problems. The result I can't stop thinking about is that it only works past about 100 billion parameters. Reasoning here isn't something the technique installs; it was already latent, and the prompt just unlocks it. That cuts two ways for anyone building on top of these models: a lot of what we call capability is really scale wearing a clever prompt, and the clever prompt is worthless below the threshold. So I treat prompting as discovery rather than engineering. The job is to find the capability the model already has, not to teach it one it doesn't. And when a trick stops working, my first question is whether I outsmarted the model or just ran into the size of it.
