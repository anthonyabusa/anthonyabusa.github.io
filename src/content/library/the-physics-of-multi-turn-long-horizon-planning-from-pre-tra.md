---
title: "The Physics of Multi-Turn Long-Horizon Planning: From Pre-training to Post-training via Single- and Multi-Teacher On-Policy Agentic Distillation"
authors:
  - "Tianyi Men"
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "want"
synopsis: "This study investigates multi-turn long-horizon planning across pre-training and post-training stages using a controlled environment. It finds that explicit world modeling enhances generalization, while suboptimal data impairs performance. On-policy distillation outperforms group relative policy optimization in low-quality settings. Multi-teacher distillation integrates capabilities by converging on shared planning patterns, enabling cross-environment generalization and continual learning while avoiding catastrophic forgetting."
takeaways:
  - "Explicit world model construction via chain-of-thought state transition modeling yields stronger long-horizon generalization than direct action prediction."
  - "Atomic skills alone are insufficient for compositional generalization, whereas a small amount of long-horizon data substantially improves planning ability."
  - "Suboptimal trajectories severely impair performance because decision errors accumulate and amplify over long horizons."
  - "On-policy distillation has a broader effective region than group relative policy optimization under low-quality pre-training data and long planning horizons."
  - "Distilling unseen multi-path procedures from a teacher with different underlying knowledge may impair the student’s existing world modeling without fully establishing the new knowledge."
  - "Multi-teacher on-policy distillation integrates capabilities by converging to shared planning-pattern distributions, enabling cross-environment generalization and supporting continual learning."
kind: "paper"
sourceUrl: "https://arxiv.org/abs/2607.24720"
notionId: "3f7176cc-7864-81c7-98b9-dbb65016a732"
notionLastEdited: "2026-10-12T20:31:00.000Z"
---
