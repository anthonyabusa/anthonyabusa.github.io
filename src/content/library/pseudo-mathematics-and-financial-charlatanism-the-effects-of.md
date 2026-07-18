---
title: "Pseudo-Mathematics and Financial Charlatanism: The Effects of Backtest Overfitting on Out-of-Sample Performance"
authors:
  - "Bailey et al."
genres:
  - "Finance"
  - "Math"
  - "Economics"
status: "read"
cover: "/covers/pseudo-math-charlatanism.png"
synopsis: "Published in the Notices of the AMS in 2014, this paper by Bailey, Borwein, Lopez de Prado, and Zhu demonstrates mathematically that a relatively small number of trials is sufficient to identify an investment strategy with a spuriously high in-sample Sharpe ratio. The paper introduces the Minimum Backtest Length (MinBTL) concept, showing that the expected maximum in-sample Sharpe ratio grows with the number of trials attempted while out-of-sample performance remains near zero, and argues that failure to disclose the number of trials makes any backtest impossible to evaluate fairly."
takeaways:
  - "Backtest overfitting arises when parameters are selected to maximize in-sample performance across many trials, causing the chosen strategy to exploit noise rather than genuine signal, and leading to out-of-sample performance that regresses toward zero regardless of the in-sample Sharpe ratio reported."
  - "The paper derives Minimum Backtest Length (MinBTL), the number of years of backtest data required to ensure that a selected strategy with a given in-sample Sharpe ratio is not merely a product of overfitting across N independent trials, with MinBTL growing approximately as 2 ln(N) divided by the square of the expected maximum Sharpe ratio."
  - "Proposition 1 establishes that the expected maximum Sharpe ratio among N independent zero-true-SR strategies grows with N, approximated by a formula involving the Euler-Mascheroni constant and the inverse normal CDF, implying that more trials mechanically inflate the best observed in-sample result."
  - "When there are no compensation effects (i.e., the financial process has no mean-reversion memory), overfitting does not induce negative out-of-sample performance on average, but the selected strategy still delivers near-zero OOS returns, making any high in-sample Sharpe ratio essentially uninformative about future returns."
  - "Model complexity compounds the overfitting risk because each additional binary parameter doubles the number of possible configurations, making it straightforward to achieve high in-sample Sharpe ratios through brute-force search even without any genuine predictive insight."
  - "A key practical implication is that any backtest submitted to investors or journals without disclosure of the number of trials N cannot be properly assessed for overfitting risk, and the authors argue that demanding this disclosure should be a standard requirement for evaluating investment research."
notionId: "3a0176cc-7864-81ce-af6f-e764df0f0dbc"
notionLastEdited: "2026-07-17T20:23:00.000Z"
---
