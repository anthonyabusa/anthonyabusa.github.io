---
title: "The Deflated Sharpe Ratio: Correcting for Selection Bias, Backtest Overfitting, and Non-Normality"
authors:
  - "Bailey & Lopez de Prado"
genres:
  - "Finance"
  - "Math"
  - "Economics"
status: "read"
cover: "/covers/deflated-sharpe.png"
synopsis: "This 2014 Journal of Portfolio Management paper by Bailey and Lopez de Prado introduces the Deflated Sharpe Ratio (DSR), a statistic that simultaneously corrects the estimated Sharpe ratio for two sources of inflation: selection bias arising from multiple testing across strategy trials, and non-normality of return distributions. By combining the Probabilistic Sharpe Ratio framework with an adjustment for the expected maximum Sharpe ratio under N independent trials, DSR provides a principled method to distinguish genuine empirical findings from statistical flukes produced by large-scale strategy search."
takeaways:
  - "The Probabilistic Sharpe Ratio (PSR), a precursor to DSR, computes the probability that a strategy's true Sharpe ratio exceeds a user-specified benchmark threshold, accounting for sample length and the first four moments of the returns distribution, thereby correcting for the bias introduced by short samples and non-Normal returns."
  - "Selection bias in strategy research arises because researchers and managers tend to report only positive outcomes, a phenomenon that inflates the apparent Type I error probability and makes improbable results look probable when the full set of trials is not disclosed alongside the reported result."
  - "The DSR is defined as the PSR evaluated at a benchmark equal to the expected maximum Sharpe ratio across N independent trials, which is itself a function of the variance of estimated Sharpe ratios across the trial set and the Euler-Mascheroni constant, making the rejection threshold increase as more strategies are evaluated."
  - "Under multiple testing, the expected maximum observed Sharpe ratio among N zero-true-SR strategies grows with N even when no strategy has genuine skill, so a fixed acceptance threshold for Sharpe ratio becomes increasingly prone to false positives as the number of candidates grows."
  - "Memory effects in financial time series make backtest overfitting especially costly because an overfit strategy targets the most extreme in-sample pattern, and mean-reverting processes will actively unwind that pattern out of sample, converting the inflation of in-sample performance into active losses rather than merely near-zero OOS returns."
  - "The hold-out or k-fold cross-validation method does not resolve backtest overfitting because it treats each application as a single trial, ignoring the accumulated multiple testing that occurred before the hold-out was applied, and repeated use of hold-out at a fixed confidence level makes invalid strategies likely to pass eventually."
sourceUrl: "https://www.davidhbailey.com/dhbpapers/deflated-sharpe.pdf"
notionId: "3a0176cc-7864-817a-8dcb-c333f560bbcd"
notionLastEdited: "2026-07-17T20:23:00.000Z"
---

The Deflated Sharpe Ratio does the one thing every serious backtest should be forced to do: it accounts for how many strategies you tried before you kept the one that looked best. Search long enough over random noise and you will always find a beautiful curve; the deflated version puts a number on how much of that beauty is selection bias. I treat it as table stakes. What I will not do is mistake it for safety. Deflating the Sharpe corrects for the sin of trying too many things, but it says nothing about a strategy quietly overfit to a market regime that no longer exists, or about the structural break waiting a month out of sample. It answers whether I fooled myself while searching, which is necessary and nowhere near sufficient. The honest posture is to assume the edge is fragile until the market keeps paying for it, and to size accordingly. A backtest earns confidence; it does not grant it.
