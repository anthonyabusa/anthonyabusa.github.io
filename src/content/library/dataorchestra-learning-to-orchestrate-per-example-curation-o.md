---
title: "DataOrchestra: Learning to Orchestrate Per-Example Curation of Pretraining Data"
authors:
  - "Zhen Huang"
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "want"
cover: "/covers/dataorchestra-learning-to-orchestrate-per-example-curation-o.png"
synopsis: "DataOrchestra introduces a framework for per-example pretraining data curation, dynamically selecting processing pipelines based on individual chunk needs. The system decides whether to drop, preserve, or clean data, applying specific operations like noise pruning or rewriting with tailored instructions. Experiments show stable gains across eleven benchmarks for models ranging from 0.5B to 7B parameters, while reducing compute by skipping unnecessary steps."
takeaways:
  - "DataOrchestra orchestrates example-specific pipelines, deciding whether to drop, untouch, or clean each data chunk."
  - "The framework unifies noise pruning, surface rectification, and pedagogical augmentation into adaptive sequences."
  - "Models pretrained from 0.5B to 7B on DataOrchestra-processed data show stable average gains across 11 benchmarks."
  - "The approach reduces processing compute by skipping downstream operations deemed unnecessary for specific examples."
  - "DataOrchestra improves math continued pretraining and outperforms strong baselines including fixed multi-stage pipelines."
  - "The orchestrator generates concrete, example-specific instructions for each rewriting step executed by downstream tool models."
notionId: "3f7176cc-7864-81c5-ad3f-f0dae4b5d2ab"
notionLastEdited: "2026-10-12T21:32:00.000Z"
---
