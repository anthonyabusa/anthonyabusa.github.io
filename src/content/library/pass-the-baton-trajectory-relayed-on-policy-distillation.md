---
title: "Pass the Baton: Trajectory-Relayed On-Policy Distillation"
authors:
  - "Haolei Xu"
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "reading"
cover: "/covers/pass-the-baton-trajectory-relayed-on-policy-distillation.png"
synopsis: "Relay On-Policy Distillation addresses prefix failure in on-policy distillation by detecting teacher-student continuation asymmetry. A label-free handoff trigger initiates brief teacher interventions to correct early reasoning errors. This approach reduces training trajectory length by over 50 percent while improving accuracy. The method outperforms standard baselines across multiple mathematical reasoning benchmarks for small language models."
takeaways:
  - "Relay-OPD detects teacher-student continuation asymmetry on failed prefixes to identify handoff triggers without labels."
  - "The method uses brief teacher legs to correct early reasoning errors before they become entrenched in the trajectory."
  - "A limited relay budget concentrates intervention on critical early positions while keeping the trajectory close to the student policy."
  - "Teacher tokens constitute only 0.35 percent of all generated tokens, yet significantly lift accuracy."
  - "Relay-OPD outperforms standard OPD by 5.73 percent and FastOPD by 1.49 percent on average for 1.7B models."
  - "Training trajectory length is reduced by over 50 percent while maintaining or improving performance across eight benchmarks."
notionId: "3f7176cc-7864-8179-90e5-da001d99a8c8"
notionLastEdited: "2026-10-12T20:37:00.000Z"
---
