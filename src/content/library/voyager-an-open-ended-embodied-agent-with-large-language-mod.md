---
title: "Voyager: An Open-Ended Embodied Agent with Large Language Models"
authors:
  - "Wang et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "want"
cover: "/covers/voyager-embodied-agent.png"
synopsis: "Voyager, introduced by Wang et al., is the first LLM-powered embodied lifelong learning agent in Minecraft, combining an automatic curriculum, a growing skill library of executable code, and an iterative prompting mechanism to enable continuous open-ended exploration and skill acquisition without human intervention or model fine-tuning."
takeaways:
  - "Voyager consists of three core components: an automatic curriculum that proposes progressively harder tasks, an ever-growing skill library that stores verified executable programs indexed by embedding, and an iterative prompting mechanism that incorporates environment feedback, execution errors, and self-verification for code refinement."
  - "The agent interacts with GPT-4 via blackbox API queries, using code as the action space instead of low-level motor commands, which enables temporally extended, interpretable, and compositional skill representation that mitigates catastrophic forgetting."
  - "Empirically, Voyager discovers 3.3 times more unique items than prior baselines within 160 prompting iterations, travels 2.3 times longer distances, and unlocks key Minecraft tech tree milestones up to 15.3 times faster than the previous state of the art."
  - "Ablation studies show that removing self-verification causes a 73% drop in discovered item count, replacing the automatic curriculum with a random one causes a 93% drop, and removing the skill library causes the agent to plateau in later stages."
  - "Voyager demonstrates zero-shot generalization to unseen tasks in a new Minecraft world, consistently solving all four novel tasks tested within 50 prompting iterations, while baselines including ReAct, Reflexion, and AutoGPT fail to solve any."
  - "The skill library acts as a transferable plug-and-play asset: providing Voyager's skill library to AutoGPT substantially boosts its zero-shot generalization performance, demonstrating the library's broad utility beyond the Voyager system itself."
notionId: "3a0176cc-7864-813a-a013-d7112c7ff393"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---
