---
title: "Self-Refine: Iterative Refinement with Self-Feedback"
authors:
  - "Madaan et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "read"
cover: "/covers/self-refine.png"
synopsis: "Self-Refine, introduced by Madaan et al., is an iterative self-improvement approach in which a single large language model generates an initial output, provides specific actionable feedback on that output, and then refines the output based on its own feedback, cycling without any additional training or supervised data."
takeaways:
  - "Self-Refine uses a single LLM as generator, feedback provider, and refiner simultaneously, requiring no additional training data, reward models, or reinforcement learning."
  - "The method is evaluated across 7 diverse tasks including dialogue response generation, code optimization, math reasoning, sentiment reversal, and constrained generation, using GPT-3.5, ChatGPT, and GPT-4 as base models."
  - "Across all evaluated tasks, Self-Refine outputs are preferred by humans and automatic metrics over single-pass generation, improving average task performance by approximately 20% absolute."
  - "Feedback quality is critical to performance: specific, actionable feedback consistently outperforms generic feedback, which in turn outperforms no feedback, as demonstrated in ablation experiments on Code Optimization, Sentiment Reversal, and Acronym Generation."
  - "In Code Optimization, GPT-4 with Self-Refine improves the optimization rate from 27.3% to 36.0%, an absolute gain of 8.7%, while Dialogue Response preference scores improve from 25.4% to 74.6% with GPT-4."
  - "Self-Refine shows diminishing returns with additional iterations, with most gains occurring in early feedback-refine cycles, and does not consistently benefit weaker models such as Vicuna-13B, which struggle to follow the refinement format."
sourceUrl: "https://arxiv.org/abs/2303.17651"
notionId: "3a0176cc-7864-819b-9a2a-f4aa387e05df"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---

Self-Refine is the close cousin of Reflexion, and it isolates the variable that actually matters: the quality of the feedback. Generic 'make this better' does almost nothing; specific, actionable critique is what drives the roughly twenty percent gain. That tracks with everything I've seen building self-correcting loops, and it's the same reason a real code review beats a thumbs-down. The caveat is the one I plan around: weaker models can't reliably run the loop, because critiquing your own work and acting on the critique is harder than producing the work in the first place. So self-refinement is a capability you have to earn, not a free wrapper you bolt onto anything. And the returns fade fast after the first pass. The lesson I keep is that a system improves in proportion to how precisely it can name what's wrong, not how many times it loops.
