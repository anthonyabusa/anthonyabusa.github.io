---
title: "Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters"
authors:
  - "Snell et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "want"
cover: "/covers/scaling-test-time-compute.png"
synopsis: "This Google DeepMind paper by Snell et al. examines how to optimally scale inference-time computation in large language models, analyzing two primary mechanisms: searching against process-based verifier reward models and iteratively revising model outputs. The authors introduce a compute-optimal scaling strategy that allocates test-time compute adaptively based on estimated problem difficulty, demonstrating that this approach can achieve efficiency gains exceeding 4 times over a best-of-N baseline and can enable a smaller model to outperform a model approximately 14 times larger on certain problem difficulties."
takeaways:
  - "Two primary mechanisms for scaling test-time compute are analyzed: modifying the proposal distribution through iterative self-revision, and optimizing a verifier by searching against a process-based reward model (PRM)."
  - "The effectiveness of each test-time compute strategy depends critically on problem difficulty relative to the base model, with revision methods favoring easier problems and beam search against a PRM favoring harder ones."
  - "A compute-optimal scaling strategy that selects the best test-time approach per difficulty bin surpasses a best-of-N baseline while using more than 4 times less compute in both the revision and PRM search settings."
  - "In a FLOPs-matched evaluation, additional test-time compute applied to a smaller model can outperform a model approximately 14 times larger on easy and medium difficulty problems, though very hard problems still benefit more from additional pretraining."
  - "Beam search outperforms best-of-N at small generation budgets against a PRM but shows diminishing returns at larger budgets, with signs of over-optimization on easier problems where it can degrade performance."
  - "Question difficulty, estimated from a model's own pass-at-1 rate across sampled solutions, serves as a practical sufficient statistic for selecting the compute-optimal test-time strategy without requiring ground-truth labels."
notionId: "3a0176cc-7864-81d5-98b4-d6927841d7d2"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---
