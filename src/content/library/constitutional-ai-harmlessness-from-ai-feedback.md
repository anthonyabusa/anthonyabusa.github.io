---
title: "Constitutional AI: Harmlessness from AI Feedback"
authors:
  - "Bai et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "read"
cover: "/covers/constitutional-ai.png"
synopsis: "This Anthropic paper by Bai et al. introduces Constitutional AI (CAI), a method for training a harmless and non-evasive AI assistant without any human feedback labels for harmful outputs. The approach uses a short list of natural language principles, a constitution, to guide an AI through a supervised critique-and-revision phase followed by reinforcement learning from AI-generated preference labels (RLAIF), producing a model that crowdworkers rate as both more helpful and more harmless than models trained with human harmlessness feedback."
takeaways:
  - "Constitutional AI operates in two stages: a supervised learning phase in which the model critiques and revises its own harmful responses according to constitutional principles, followed by a reinforcement learning phase using AI-generated preference labels (RLAIF) rather than human harmlessness labels."
  - "The resulting RL-CAI model is preferred by crowdworkers over models trained with human harmlessness feedback, achieving a Pareto improvement on the helpfulness-harmlessness trade-off frontier compared to standard RLHF baselines."
  - "Iterative critique and revision progressively reduces harmfulness, with each additional revision improving harmlessness preference model scores, and the critiquing step is shown to be more effective than generating revisions directly without critique."
  - "Chain-of-thought reasoning during AI evaluations significantly improves the accuracy of harm identification, with ensembled chain-of-thought approaching the performance of preference models trained on human feedback labels for larger model sizes."
  - "The constitutional approach produces non-evasive responses: rather than refusing harmful queries outright, the trained model engages with them by explaining its objections, reducing the tension between helpfulness and harmlessness that affected prior RLHF models."
  - "Human oversight in this framework is compressed to a small, legible set of natural language principles rather than tens of thousands of human preference labels, making the values governing model behavior more transparent and easier to audit and adjust."
notionId: "3a0176cc-7864-81b2-82f7-deb43e4b6106"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---
