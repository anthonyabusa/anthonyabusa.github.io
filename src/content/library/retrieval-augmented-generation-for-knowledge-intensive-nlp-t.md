---
title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
authors:
  - "Lewis et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
status: "read"
cover: "/covers/rag-knowledge-intensive-nlp.png"
synopsis: "This paper by Lewis et al. from Facebook AI Research introduces Retrieval-Augmented Generation (RAG), a general-purpose framework that combines a pre-trained parametric seq2seq model with a non-parametric dense vector index of Wikipedia, trained end-to-end. RAG enables language models to ground generation in retrieved documents, yielding state-of-the-art results on open-domain question answering and producing more factual and specific text than purely parametric baselines."
takeaways:
  - "RAG combines a Dense Passage Retriever that encodes queries and documents as BERT-based embeddings with a BART-large generator, treating retrieved documents as latent variables and marginalizing over them during training so that both components are jointly optimized without direct supervision on which documents to retrieve."
  - "Two model variants are proposed: RAG-Sequence, which uses one retrieved document to generate the full output sequence, and RAG-Token, which can draw on a different document for each generated token, with the token-level variant performing better on tasks requiring synthesis across multiple sources."
  - "RAG achieves state-of-the-art exact match scores on three open-domain QA datasets, including Natural Questions and WebQuestions, outperforming both parametric-only closed-book models and specialized retrieve-and-extract architectures that rely on retrieval supervision."
  - "On the Jeopardy question generation task, human evaluators rated RAG generations as more factual than BART in 42.7% of cases versus 7.1% for BART, and RAG generations were judged more specific in 37.4% of cases versus 16.8% for BART."
  - "For FEVER fact verification, RAG achieves accuracy within 4.3% of state-of-the-art pipeline models that use strong retrieval supervision and domain-specific architectures, despite RAG requiring no retrieval supervision."
  - "The non-parametric memory in RAG can be updated at test time by swapping in a new document index without retraining, demonstrating that world knowledge can be refreshed independently of the generator parameters."
notionId: "3a0176cc-7864-8187-91f7-e3d2baaa72a3"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---
