---
title: "RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval"
authors:
  - "Sarthi et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "read"
cover: "/covers/raptor-tree-retrieval.png"
synopsis: "RAPTOR, published at ICLR 2024 by researchers at Stanford University, introduces a tree-based retrieval system for retrieval-augmented language models. Rather than retrieving only short contiguous text chunks, RAPTOR recursively clusters, summarizes, and re-embeds text to construct a hierarchical tree of summaries, enabling retrieval at multiple levels of abstraction for more effective question answering over long documents."
takeaways:
  - "RAPTOR builds a multi-layered tree by recursively clustering text chunks using Gaussian Mixture Models with UMAP dimensionality reduction, then summarizing each cluster with an LLM, enabling retrieval at both fine-grained and thematic levels."
  - "Two retrieval strategies are introduced: tree traversal, which selects top-k nodes layer by layer from root to leaf, and collapsed tree, which flattens all nodes into a single pool for simultaneous cosine similarity search, with the collapsed approach performing better in experiments."
  - "On the QASPER dataset, RAPTOR with GPT-4 achieves an F-1 Match score of 55.7%, surpassing the prior best result of 53.9% from CoLT5 XL."
  - "On the QuALITY benchmark, RAPTOR paired with GPT-4 achieves 82.6% accuracy on the full test set and 76.2% on the harder subset, surpassing the prior best result of 62.3% by a margin of over 20 percentage points in absolute accuracy."
  - "RAPTOR consistently outperforms baseline retrieval methods including BM25 and DPR across three language models (GPT-3, GPT-4, and UnifiedQA) and three question-answering datasets, demonstrating the generality of the approach."
  - "An annotation study found that approximately 4% of RAPTOR summaries contained minor hallucinations, and these did not propagate to parent nodes or measurably affect downstream question-answering performance."
sourceUrl: "https://arxiv.org/abs/2401.18059"
notionId: "3a0176cc-7864-81af-adf4-cb30f4dea3f3"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---

Most retrieval systems treat a corpus as a bag of chunks: you ask a question, they hand back the paragraphs that share your words, and you hope the answer was sitting in one of them. RAPTOR's move is quieter and more important. It summarizes the material into a tree before anyone asks anything, so what you retrieve is the shape of an argument rather than a keyword match. That is exactly what I wanted out of Metis's memory. When the system reasons about a decision I made months ago, it should recover why the decision was made, not just the line where I happened to say it. Flat search can find the sentence; only a hierarchy can find the reasoning. The lesson I keep coming back to is that memory is not storage, it is structure. What you are able to retrieve was decided by how you chose to organize it, long before the question arrived.
