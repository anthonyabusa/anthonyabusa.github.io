---
title: "Self-Consistency Improves Chain of Thought Reasoning in Language Models"
authors:
  - "Wang et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "read"
cover: "/covers/self-consistency-cot.png"
synopsis: "This paper proposes self-consistency, a decoding strategy designed to improve chain-of-thought prompting by replacing greedy decoding with a sample-and-marginalize procedure. The method samples a diverse set of reasoning paths from the language model decoder and selects the most frequent final answer, exploiting the intuition that correct reasoning processes tend to converge on the same answer even when they follow different intermediate paths."
takeaways:
  - "Self-consistency replaces the single greedy decode in chain-of-thought prompting with sampling of multiple diverse reasoning paths, then aggregates final answers by majority vote, requiring no additional training, fine-tuning, or auxiliary models."
  - "Across four language models (UL2-20B, GPT-3 175B, LaMDA-137B, PaLM-540B) evaluated on arithmetic and commonsense reasoning benchmarks, self-consistency consistently and significantly improves over chain-of-thought prompting with greedy decoding."
  - "On GSM8K, self-consistency achieves absolute accuracy gains of up to +17.9 percentage points over greedy chain-of-thought decoding; on SVAMP the gain is +11.0%, on AQuA +12.2%, on StrategyQA +6.4%, and on ARC-challenge +3.9%."
  - "Self-consistency substantially outperforms alternative multi-sample methods including sample-and-rank, beam search decoding, and prompt-order or multi-prompt ensemble approaches, because diversity in reasoning paths, not just multiple samples, is the key to accuracy gains."
  - "The method is robust to imperfect prompts: when chain-of-thought prompts contain minor errors that reduce greedy-decode accuracy from 17.1 to 14.9 on LaMDA-137B GSM8K, self-consistency with 40 paths recovers performance to 23.4, above the correct-prompt baseline."
  - "Self-consistency also improves performance on tasks where chain-of-thought hurts relative to standard prompting, such as natural language inference and closed-book QA, making it a broadly reliable augmentation for few-shot in-context learning."
notionId: "3a0176cc-7864-81ef-9ffd-fc36a9f6182e"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---
