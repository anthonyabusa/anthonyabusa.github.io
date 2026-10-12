---
title: "Reusing Past Repairs Through Hierarchical Trajectory Abstraction"
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "want"
kind: "paper"
sourceUrl: "https://arxiv.org/abs/2607.29658"
cover: "/covers/reusing-past-repairs-through-hierarchical-trajectory-abstrac.png"
synopsis: "STAIR converts historical repair trajectories into hierarchical, reusable plans for coding agents. It transforms past actions into multi-level trees spanning fine-grained diagnostics to high-level strategies. When new issues arise, STAIR selects relevant nodes, adapts them into executable plans, and supplies them via prompts. This approach enables effective reuse of procedural knowledge across different agents and abstraction levels."
takeaways:
  - "STAIR transforms historical repair trajectories into multi-level trees containing fine-grained actions and high-level strategies."
  - "The framework achieves 81.2% Pass@1 on SWE-bench Verified using MiniMax M2.5."
  - "STAIR reaches 79.2% Pass@1 on SWE-bench Verified when integrated with GPT-5."
  - "Generated plans transfer to miniSWE-agent v2 without modification, improving Pass@1 from 75.8% to 81.0%."
  - "Mixing multiple abstraction levels surpasses performance achieved by any single abstraction level."
  - "Raw, unabstracted trajectories transfer substantially worse than the hierarchical approach."
notionId: "3f7176cc-7864-8125-9148-ca70ca9c30c0"
notionLastEdited: "2026-10-12T21:42:00.000Z"
---
