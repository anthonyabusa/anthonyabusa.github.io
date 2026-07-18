---
title: "AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration"
authors:
  - "Lin et al."
genres:
  - "Artificial Intelligence"
  - "Computer Science"
  - "Technology"
status: "read"
cover: "/covers/awq-quantization.png"
synopsis: "This paper proposes Activation-aware Weight Quantization (AWQ), a hardware-friendly, training-free method for low-bit weight-only quantization of large language models. AWQ identifies a small fraction of salient weight channels using activation magnitudes rather than weight magnitudes, and protects them via per-channel scaling to reduce quantization error without mixed-precision representation, achieving strong compression while preserving generalization."
takeaways:
  - "AWQ observes that only 0.1% to 1% of weight channels are salient for LLM performance, and that identifying these channels by activation magnitude rather than weight magnitude is the correct signal for reducing quantization error."
  - "Rather than keeping salient weights in FP16 (which is hardware-inefficient), AWQ mathematically derives that scaling up salient channels before quantization reduces their relative error, then applies an equivalent inverse scale to activations, maintaining a hardware-friendly uniform-precision format."
  - "AWQ requires no backpropagation or reconstruction and uses only a small offline calibration set to collect activation statistics, avoiding overfitting to specific domains and preserving out-of-distribution generalization."
  - "Across LLaMA, Llama-2, OPT, Mistral, and Mixtral model families under INT3 and INT4 quantization, AWQ consistently achieves lower perplexity than round-to-nearest (RTN) and GPTQ baselines."
  - "AWQ generalizes to instruction-tuned models (Vicuna) and, for the first time, to multi-modal language models (OpenFlamingo-9B, LLaVA-13B, VILA), reducing quantization degradation on COCO captioning from 4.57 to 1.17 CIDEr points under INT4-g128."
  - "The accompanying TinyChat inference framework uses on-the-fly dequantization, SIMD-aware weight packing, and kernel fusion to deliver more than 3x speedup over the HuggingFace FP16 baseline on desktop and mobile GPUs, enabling deployment of 70B-scale models on edge hardware."
notionId: "3a0176cc-7864-8107-b07f-e29f1ad4fbe9"
notionLastEdited: "2026-07-17T20:22:00.000Z"
---
