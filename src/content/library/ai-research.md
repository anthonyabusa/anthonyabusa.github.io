---
title: "GSM-Symbolic: Understanding the Limitations of Mathematical Reasoning in Large Language Models"
genres:
  - "Artificial Intelligence"
  - "Research"
  - "Engineering"
  - "Technology"
  - "Education"
status: "read"
progress: 0.02
cover: "/covers/gsm-symbolic.png"
synopsis: "An ICLR 2025 study from Apple researchers asking whether large language models genuinely reason through mathematics or mostly pattern-match. The authors introduce GSM-Symbolic, which regenerates each grade-school problem in many variants, and show that accuracy swings with superficial wording changes and drops sharply when an irrelevant clause is added. A rigorous, clarifying look at the real limits of machine reasoning."
takeaways:
  - "GSM-Symbolic converts each GSM8K problem into a template, so the same question can be regenerated with fresh names and numbers. That lets the authors measure reasoning as a distribution across many variants rather than a single, gameable accuracy score."
  - "All 25 models tested show meaningful accuracy variance across variants of the same problem, even when only names or values change. Genuine step-by-step reasoning would stay stable, so the swings suggest something more fragile is at work."
  - "For most models the familiar GSM8K score sits on the optimistic tail of the GSM-Symbolic distribution, a hint that widely quoted benchmark numbers may be inflated by data contamination."
  - "Models tolerate changes to proper names fairly well but degrade more when the numbers change, and more still as clauses are added. Accuracy falls and variance grows as complexity increases."
  - "The sharpest finding is GSM-NoOp: adding one relevant-sounding but inconsequential clause drops accuracy by up to 65 percent across every model, including frontier ones. They tend to convert each stated detail into an operation instead of judging what actually matters."
  - "The gap resists few-shot prompting, even when the examples contain the same question or similar no-op cases. The authors conclude that today's models rely on sophisticated pattern-matching rather than formal logical reasoning."
notionId: "12c176cc-7864-809f-b940-d928bec51fa0"
notionLastEdited: "2026-07-17T20:24:00.000Z"
---
