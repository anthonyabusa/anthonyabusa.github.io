# Per-virtue entry template — the near-enemies series

Kept out of `src/content/blog/` on purpose: the blog collection validates frontmatter,
and a template's placeholders are not a valid `pubDate`. Copy this file into
`src/content/blog/<slug>.md` and fill it in.

## The shape each entry holds

One virtue, one counterfeit, one piece of real evidence that the two come apart.
Sections in this order, because each one earns the next:

1. **Open on the pair.** Define both in a sentence each. Name the single structural
   difference. Do not warm up.
2. **What the virtue actually is.** The precise definition, not the common one.
   Name its components and say which one the counterfeit drops.
3. **What the counterfeit does instead.** The mechanism: what it borrows, where it
   stops, what it substitutes.
4. **The evidence.** A real citation, its finding in plain words, and an explicit
   statement of where the study's seam does or does not match the pair you are
   writing about.
5. **What moves a person across.** The practical half. If there is no evidence for
   a transition mechanism, say that instead of implying one.
6. **The shape of the distinction.** Close by restating the structure, not the feeling.
7. **References.** Full citations.

## The rules that are not negotiable

- **Every empirical claim traces to a source you actually opened.** Journal, volume,
  pages, DOI. A plausible-looking citation is worse than none: it survives review by
  looking right. If a claim cannot be sourced, cut the claim.
- **Anatomy and study design are claims too.** Getting the venue, the design
  (within-subject vs parallel groups), or the brain region wrong discredits the
  argument as fast as inventing the paper would.
- **State the seam.** These entries pair a contemplative distinction with an empirical
  one, and the two rarely map exactly. Where the literature splits the construct along
  a different line than the virtue/near-enemy pair does, print that in the body. The
  honesty is the argument — the framework has no empirical literature under its own
  name, so borrowed evidence has to be labelled as borrowed.
- **No first-person claims about Ant's experience** unless they come from his own
  words. Agent-drafted prose never speaks in his voice.
- **Ships as `draft: true`.** It leaves draft only after his voice pass.

## Frontmatter

```yaml
---
title: "The Virtue of <VIRTUE> and Its Counterfeit"
description: "<One sentence: the pair, and why the difference has consequences.>"
pubDate: <YYYY-MM-DD>
tags: ["Psychology", "Virtue", "Near enemies"]
draft: true
---
```

Use the `Near enemies` tag exactly as spelled here — it is the tag the opener and the
Plotted piece already use, and a capitalisation drift splits the series in two.

## Where the data lives

`src/data/near-enemies.ts` carries all 21 triads with their scores, and for five of
them a `literature` field naming the published two-factor construct, its citation and,
where relevant, a note on the mismatched seam. Start there: if the virtue you are
writing has a `literature` entry, that citation is your section 4. If it does not,
section 4 has to find its own source or say plainly that none exists.
