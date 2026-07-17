---
title: "Mixtral of Experts"
authors:
  - "Jiang et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
  - "Technology"
status: "read"
cover: "/covers/mixtral-of-experts.png"
synopsis: "This paper introduces Mixtral 8x7B, a Sparse Mixture of Experts (SMoE) language model from Mistral AI in which each transformer layer contains 8 feedforward expert blocks and a router network selects 2 experts per token. Although the model has 47B total parameters, only 13B are active during inference, enabling it to outperform or match Llama 2 70B and GPT-3.5 across evaluated benchmarks while using roughly 5 times fewer active parameters."
takeaways:
  - "Mixtral 8x7B uses a sparse mixture-of-experts architecture where a router selects 2 of 8 expert feedforward blocks per token at each layer, giving 47B total parameters but only 13B active parameters per inference step."
  - "Despite its lower active parameter count, Mixtral outperforms Llama 2 70B on most benchmarks and matches or surpasses GPT-3.5 on tasks including MMLU (70.6% vs 69.9% and 70.0%), mathematics, and code generation."
  - "The model supports a 32k token context window and achieves 100% retrieval accuracy on passkey tasks regardless of sequence length or passkey position, demonstrating strong long-range memory."
  - "Mixtral was pretrained with substantially more multilingual data than Mistral 7B and significantly outperforms Llama 2 70B on French, German, Spanish, and Italian benchmarks while maintaining strong English performance."
  - "An instruction-tuned variant, Mixtral 8x7B Instruct, fine-tuned with supervised fine-tuning and Direct Preference Optimization, achieves an LMSys Arena Elo of 1121, outperforming Claude-2.1, GPT-3.5-Turbo, and Gemini Pro on human evaluation benchmarks."
  - "Routing analysis shows expert assignment is more strongly correlated with token syntax than with semantic domain, and consecutive tokens exhibit high temporal locality in expert selection, with implications for caching and Expert Parallelism strategies."
notionId: "3a0176cc-7864-8193-8725-d301c0e68788"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---
