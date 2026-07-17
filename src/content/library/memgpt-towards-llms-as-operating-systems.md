---
title: "MemGPT: Towards LLMs as Operating Systems"
authors:
  - "Packer et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "read"
cover: "/covers/memgpt-llms-as-os.png"
synopsis: "MemGPT, introduced by researchers at UC Berkeley, draws an analogy between operating system memory hierarchies and large language model context management. The system introduces virtual context management, enabling LLMs to page information between a limited main context window and external storage tiers via self-directed function calls, allowing agents to maintain coherent long-term interactions and analyze documents that far exceed any fixed context length."
takeaways:
  - "MemGPT implements a two-tier memory architecture analogous to OS virtual memory: main context, consisting of system instructions, a working context block, and a FIFO queue of recent messages, and external context comprising recall storage for conversation history and archival storage for arbitrary-length documents."
  - "The system enables self-directed memory management through function calls: when context pressure is detected, the LLM processor can autonomously write important facts to working context, search recall storage for past conversations, or paginate through archival storage results without user intervention."
  - "On a deep memory retrieval task requiring recall of facts from prior conversation sessions, MemGPT with GPT-4 Turbo achieves 93.4% accuracy compared to 35.3% for the GPT-4 Turbo baseline without MemGPT, representing a substantial improvement in long-term consistency."
  - "For document question answering, fixed-context baselines degrade in performance as document truncation increases, while MemGPT maintains stable accuracy by iteratively paging through archival storage, effectively decoupling performance from context window size."
  - "On a nested key-value retrieval task requiring multi-hop lookups across chained key-value pairs, MemGPT with GPT-4 is the only approach able to consistently complete tasks beyond 2 nesting levels, while all fixed-context baselines drop to 0% accuracy at 3 nesting levels."
  - "The OS-inspired design, including event-driven control flow, function chaining via a heartbeat mechanism, and queue eviction policies, allows MemGPT to handle unbounded contexts using fixed-context LLMs without requiring changes to the underlying model architecture."
notionId: "3a0176cc-7864-8114-bb62-c19dbba6710f"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---
