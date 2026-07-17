---
title: "LLM in a flash: Efficient Large Language Model Inference with Limited Memory"
authors:
  - "Alizadeh et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
  - "Technology"
status: "read"
cover: "/covers/llm-in-a-flash.png"
synopsis: "This Apple paper addresses the challenge of running large language models whose parameter counts exceed available DRAM by storing weights in flash memory and loading only the necessary subset into DRAM on demand. The authors construct an inference cost model informed by flash memory hardware characteristics and introduce two principal techniques, windowing and row-column bundling, achieving inference on models up to twice the DRAM capacity at speeds up to 4x to 25x faster than naive flash-loading baselines."
takeaways:
  - "The core insight is that activation sparsity in feedforward networks (over 90% in ReLU-activated models such as OPT 6.7B and Falcon 7B) means only a dynamic subset of weights must be loaded per token, sharply reducing the volume of data transferred from flash to DRAM."
  - "A low-rank predictor trained on the attention output of the current layer anticipates which FFN neurons will activate, enabling selective loading of only the required columns and rows from flash without meaningfully degrading zero-shot accuracy (HellaSwag drops from 50.3 to 49.8 on OPT 6.7B)."
  - "The windowing technique maintains a sliding cache of recently active neurons in DRAM, exploiting the observed decrease in incremental neuron transfer as generation proceeds, so that each new token requires loading progressively less data from flash."
  - "Row-column bundling coalesces corresponding up-projection columns and down-projection rows into contiguous flash chunks, doubling effective chunk size from d-model to 2*d-model bytes and increasing read throughput toward the sequential-read ceiling of flash."
  - "On an Apple M1 Max with half the model size available in DRAM, the combined system reduces OPT 6.7B I/O latency from 2196 ms (naive) to 87 ms on CPU with all techniques enabled, and achieves 20x to 25x speedup over naive loading on Metal and NVIDIA GPU backends."
  - "The method is orthogonal to quantization and sparsification and runs models up to twice the DRAM capacity, expanding LLM accessibility to personal devices such as smartphones and laptops without requiring changes to model weights or architecture."
notionId: "3a0176cc-7864-816e-b0cb-c96513bbc87a"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---
