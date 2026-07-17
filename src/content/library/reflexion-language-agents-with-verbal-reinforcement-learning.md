---
title: "Reflexion: Language Agents with Verbal Reinforcement Learning"
authors:
  - "Shinn et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "read"
cover: "/covers/reflexion-verbal-rl.png"
synopsis: "Reflexion, introduced by Shinn et al., is a framework that reinforces language agents through verbal feedback rather than gradient updates or weight changes. Agents verbally reflect on task outcomes, storing self-generated linguistic summaries in an episodic memory buffer to improve performance across subsequent trials in decision-making, reasoning, and coding tasks."
takeaways:
  - "Reflexion replaces traditional scalar reward signals with verbal self-reflection, converting environment feedback into natural language summaries stored in long-term memory, enabling improvement without any model fine-tuning."
  - "The framework uses three cooperating components: an Actor that generates actions, an Evaluator that scores trajectories, and a Self-Reflection model that produces actionable verbal feedback from failures."
  - "On the HumanEval coding benchmark, Reflexion achieves 91% pass@1 accuracy, surpassing the prior state-of-the-art GPT-4 result of 80%."
  - "In sequential decision-making on AlfWorld, Reflexion agents improve over strong baselines by an absolute 22% across 12 iterative learning trials, and improve HotPotQA reasoning performance by 20%."
  - "Reflexion is compatible with multiple feedback signal types, including binary environment rewards, heuristic rules, and self-generated unit tests, making it applicable across diverse task domains."
  - "A key limitation is reliance on the LLM's own self-evaluation quality, and memory is bounded by a sliding window of recent experiences to respect context length constraints."
notionId: "3a0176cc-7864-8150-903c-ea19d126d117"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---
