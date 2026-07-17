---
title: "Training Language Models to Follow Instructions with Human Feedback"
authors:
  - "Ouyang et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "read"
cover: "/covers/instructgpt-rlhf.png"
synopsis: "Ouyang et al. present InstructGPT, a method for aligning GPT-3 with user intent by fine-tuning with human feedback through a three-step process: supervised fine-tuning on labeler demonstrations, reward model training on human preference comparisons, and reinforcement learning via PPO to optimize the reward signal."
takeaways:
  - "The training pipeline consists of three stages: supervised fine-tuning on labeler-written demonstrations, training a reward model on human-ranked output comparisons, and optimizing the policy against the reward model using the PPO algorithm."
  - "Human evaluators prefer outputs from the 1.3 billion parameter InstructGPT model over outputs from the 175 billion parameter GPT-3 in blind evaluations, despite InstructGPT having 100 times fewer parameters, demonstrating that alignment training can outweigh raw scale."
  - "Outputs from the 175 billion parameter InstructGPT model are preferred over 175 billion parameter GPT-3 outputs 85% plus or minus 3% of the time, and over few-shot GPT-3 outputs 71% plus or minus 4% of the time."
  - "InstructGPT shows meaningful improvements in truthfulness, generating truthful and informative answers on TruthfulQA approximately twice as often as GPT-3, and produces roughly 25% fewer toxic outputs than GPT-3 when prompted to be respectful."
  - "RLHF fine-tuning introduces an alignment tax, causing performance regressions on some public NLP benchmarks such as SQuAD and HellaSwag, but mixing pretraining gradients into PPO updates substantially reduces these regressions without degrading labeler preference scores."
  - "InstructGPT generalizes instruction-following behavior to domains underrepresented in fine-tuning, including non-English languages and coding tasks, suggesting the models learn a broader notion of following instructions rather than memorizing specific patterns."
notionId: "3a0176cc-7864-8173-af77-f28c6ddd2257"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---
