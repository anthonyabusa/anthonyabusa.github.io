---
title: "Let's Verify Step by Step"
authors:
  - "Lightman et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "read"
cover: "/covers/lets-verify-step-by-step.png"
synopsis: "This OpenAI paper by Lightman et al. investigates whether process supervision, which provides feedback on each intermediate reasoning step, produces more reliable reward models than outcome supervision, which only evaluates final answers. Testing on the MATH dataset, the authors find that a process-supervised reward model solves 78.2% of problems from a representative test subset, outperforming outcome-supervised models, and that active learning improves data efficiency by approximately 2.6 times. The authors also release PRM800K, a dataset of 800,000 step-level human feedback labels."
takeaways:
  - "Process-supervised reward models (PRMs) significantly outperform outcome-supervised reward models (ORMs) on the challenging MATH benchmark, with the best PRM solving 78.2% of problems compared to 72.4% for the best ORM in a best-of-1860 evaluation."
  - "Outcome supervision can reward incorrect reasoning that reaches a correct final answer, a flaw process supervision avoids by pinpointing the exact location of errors in a solution chain."
  - "Active learning, by strategically surfacing convincing wrong-answer solutions to human labelers rather than sampling uniformly, yields approximately a 2.6 times improvement in data efficiency for training PRMs."
  - "A large reward model can reliably approximate human supervision for smaller reward models, enabling large-scale ablation studies that would otherwise be infeasible due to the cost of human feedback."
  - "The PRM800K dataset, containing 800,000 step-level human feedback labels across 75,000 solutions to 12,000 problems, is released publicly to support further research into process supervision."
  - "Process supervision also carries alignment advantages: it is easier for humans to interpret and more directly rewards models for following a human-endorsed chain-of-thought, discouraging models from using incorrect reasoning to reach correct answers."
notionId: "3a0176cc-7864-8116-9c3a-dec34767688c"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---
