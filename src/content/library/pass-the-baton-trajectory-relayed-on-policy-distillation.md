---
title: "Pass the Baton: Trajectory-Relayed On-Policy Distillation"
authors:
  - "Haolei Xu"
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "reading"
cover: "/covers/pass-the-baton-trajectory-relayed-on-policy-distillation.png"
synopsis: "Relay On-Policy Distillation addresses prefix failure in on-policy distillation by detecting teacher-student continuation asymmetry on failed reasoning prefixes. A label-free handoff trigger initiates brief teacher interventions, creating relay trajectories that correct early errors. This method concentrates correction at critical early positions, reducing training trajectory length by over 50 percent while significantly improving accuracy across multiple mathematical reasoning benchmarks compared to standard baselines."
takeaways:
  - "Relay On-Policy Distillation identifies a teacher-student continuation asymmetry where teachers redirect while students continue along wrong directions."
  - "The method uses a label-free handoff trigger to detect failed reasoning prefixes and initiate brief teacher interventions."
  - "Teacher interventions are limited to early positions, with teacher tokens comprising only 0.35 percent of generated tokens."
  - "Relay-OPD outperforms standard On-Policy Distillation by plus 5.73 percent and FastOPD by plus 1.49 percent on average."
  - "The approach reduces average training trajectory length by over 50 percent while maintaining or improving model accuracy."
  - "Experiments demonstrate consistent gains for 0.6B and 1.7B student models across eight mathematical reasoning benchmarks."
notionId: "3f7176cc-7864-81fb-bf8c-f17702373ec6"
notionLastEdited: "2026-10-12T21:33:00.000Z"
---
