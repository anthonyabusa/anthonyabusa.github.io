---
title: "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"
authors:
  - "Zheng et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "read"
cover: "/covers/llm-as-judge-mt-bench.png"
synopsis: "This paper by Zheng et al. proposes using strong large language models as automated judges to evaluate chat assistant quality on open-ended questions, introducing MT-bench, an 80-question multi-turn benchmark, and Chatbot Arena, a crowdsourced battle platform. The authors systematically examine LLM-as-a-judge limitations including position bias, verbosity bias, and limited reasoning ability, propose mitigations, and find that GPT-4 as a judge achieves over 80% agreement with human expert preferences, matching the level of agreement observed between humans."
takeaways:
  - "GPT-4 used as a judge achieves over 80% agreement with human expert evaluators on MT-bench, matching the human-to-human agreement rate and validating LLM-as-a-judge as a scalable proxy for human preference evaluation."
  - "Three LLM-as-a-judge formats are proposed and analyzed: pairwise comparison, single-answer grading, and reference-guided grading, each with different trade-offs in scalability and stability."
  - "Position bias is a significant limitation: most LLM judges favor the response presented first, with GPT-4 producing consistent results in only about 65% of cases under a default prompt, though swapping positions and declaring a tie on inconsistent results can mitigate this."
  - "Verbosity bias causes LLM judges to favor unnecessarily long responses over more concise, accurate ones, with Claude-v1 and GPT-3.5 showing high failure rates on a repetitive-list attack while GPT-4 is substantially more robust."
  - "LLM judges exhibit limited capability in grading math and reasoning questions, but a reference-guided method, where the judge first independently generates an answer before evaluating, reduces the math grading failure rate from 70% to 15% over a default prompt."
  - "MT-bench and traditional benchmarks such as MMLU measure complementary qualities; no single benchmark determines overall model quality, supporting the use of both capability-based and preference-based evaluations together."
notionId: "3a0176cc-7864-811d-b45c-fc22b1541f5d"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---
