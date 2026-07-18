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
notionId: "3a0176cc-7864-819b-9a2a-f4aa387e05df"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---
