#!/usr/bin/env python3
"""Generate src/data/near-enemies.ts from the Warriner et al. (2013) affective norms.

The near-enemy framework claims that a counterfeit virtue sits closer to the real
thing than the plain opposite does. This script tests that claim against ratings
collected for an unrelated purpose: 13,915 English lemmas scored by ~1,827 raters
on valence (pleasantness), arousal (intensity) and dominance (sense of control).
The raters never saw the framework, so they cannot have been primed by it.

Triads come from Ant's working list in Notion. Each abstract pair is resolved to
the closest single word the lexicon actually contains; where that proxy is lossy
the `proxyNote` field records it, so the piece can state the limitation instead of
hiding it.

Source: Warriner, A.B., Kuperman, V., & Brysbaert, M. (2013). "Norms of valence,
arousal, and dominance for 13,915 English lemmas." Behavior Research Methods 45(4).
Ratings mirror: github.com/JULIELab/XANEW (CC BY-NC-SA 3.0).

Usage: python3 scripts/plotted/build-near-enemies.py
"""

import csv
import io
import json
import math
import urllib.request
from pathlib import Path

RATINGS_URL = "https://raw.githubusercontent.com/JULIELab/XANEW/master/Ratings_Warriner_et_al.csv"
OUT = Path(__file__).resolve().parents[2] / "src" / "data" / "near-enemies.ts"

# (virtue label, virtue word, near-enemy word, far-enemy word, Ant's original near-enemy
#  phrasing, gloss, proxy note or None)
TRIADS = [
    ("Love", "love", "attachment", "hatred", "attachment",
     "Love allows freedom; attachment is possessive.", None),
    ("Compassion", "compassion", "pity", "cruelty", "pity",
     "Compassion moves toward suffering; pity keeps its distance.", None),
    ("Confidence", "confidence", "arrogance", "insecurity", "arrogance",
     "Confidence is self-assurance; arrogance is self-importance.", None),
    ("Empathy", "empathy", "sympathy", "callous", "sympathy",
     "Empathy feels with; sympathy feels sorry for.", None),
    ("Contentment", "contentment", "apathy", "greed", "apathy",
     "Contentment is satisfied with what is; apathy stopped caring.", None),
    ("Courage", "courage", "reckless", "cowardice", "recklessness",
     "Courage faces the risk; recklessness never counted it.", None),
    ("Humility", "humility", "meek", "conceit", "self-abasement",
     "Humility knows its size; self-abasement makes itself small.",
     "'meek' is the nearest single word; the lexicon has no entry for self-abasement."),
    ("Trust", "trust", "gullible", "distrust", "naivete",
     "Trust reads the evidence; naivete skips it.", None),
    ("Patience", "patience", "indifference", "impatience", "indifference",
     "Patience waits and still cares; indifference just stopped caring.", None),
    ("Freedom", "freedom", "reckless", "oppression", "recklessness",
     "Freedom knows its boundaries; recklessness ignores them.", None),
    ("Gratitude", "gratitude", "obligation", "ungrateful", "obligation",
     "Gratitude is thankful; obligation feels indebted.", None),
    ("Joy", "joy", "mania", "misery", "mania",
     "Joy is durable; mania is frantic and thin.", None),
    ("Peacefulness", "peace", "detachment", "violence", "disengagement",
     "Peace is calm with awareness; disengagement left the room.", None),
    ("Authenticity", "authenticity", "sanctimonious", "phony", "self-righteousness",
     "Authenticity is true to itself; self-righteousness imposes itself on you.",
     "'sanctimonious' stands in for self-righteousness, which the lexicon lacks."),
    ("Resilience", "resilient", "stubborn", "helpless", "stubbornness",
     "Resilience adapts and returns; stubbornness refuses to adapt.",
     "'resilient' is used because 'resilience' is not in the lexicon."),
    ("Kindness", "kindness", "flattery", "cruelty", "people-pleasing",
     "Kindness comes from care; people-pleasing is shopping for approval.",
     "'flattery' is the closest available proxy for people-pleasing."),
    ("Wisdom", "wisdom", "cunning", "folly", "cunning",
     "Wisdom seeks to understand; cunning seeks to maneuver.", None),
    ("Generosity", "generosity", "martyr", "greed", "martyrdom",
     "Generosity is other-focused; martyrdom keeps the receipt.", None),
    ("Hope", "hope", "optimism", "despair", "optimism",
     "Hope plans a route to better; optimism assumes one exists.", None),
    ("Integrity", "integrity", "rigid", "dishonesty", "rigidity",
     "Integrity holds a principle; rigidity cannot bend at all.", None),
    ("Discipline", "discipline", "rigid", "laziness", "rigidity",
     "Discipline chooses the hard thing; rigidity cannot choose otherwise.", None),
]


def fetch_ratings():
    with urllib.request.urlopen(RATINGS_URL, timeout=120) as resp:
        text = resp.read().decode("utf-8")
    out = {}
    for row in csv.DictReader(io.StringIO(text)):
        out[row["Word"]] = {
            "valence": round(float(row["V.Mean.Sum"]), 2),
            "arousal": round(float(row["A.Mean.Sum"]), 2),
            "dominance": round(float(row["D.Mean.Sum"]), 2),
            "raters": int(row["V.Rat.Sum"]),
        }
    return out


def main():
    ratings = fetch_ratings()

    missing = sorted(
        {w for _, v, n, f, *_ in TRIADS for w in (v, n, f) if w not in ratings}
    )
    if missing:
        raise SystemExit(f"words absent from the lexicon: {missing}")

    triads = []
    for label, v, n, f, ant, gloss, note in TRIADS:
        rv, rn, rf = ratings[v], ratings[n], ratings[f]
        dist = lambda a, b: round(
            math.dist(
                (a["valence"], a["dominance"]), (b["valence"], b["dominance"])
            ),
            2,
        )
        triads.append({
            "virtue": label,
            "gloss": gloss,
            "antNearEnemy": ant,
            "words": {
                "virtue": {"word": v, **rv},
                "near": {"word": n, **rn},
                "far": {"word": f, **rf},
            },
            "nearDistance": dist(rv, rn),
            "farDistance": dist(rv, rf),
            **({"proxyNote": note} if note else {}),
        })

    triads.sort(key=lambda t: t["nearDistance"])

    n_total = len(triads)
    n_closer = sum(1 for t in triads if t["nearDistance"] < t["farDistance"])
    summary = {
        "triads": n_total,
        "nearCloserCount": n_closer,
        "meanNearDistance": round(sum(t["nearDistance"] for t in triads) / n_total, 2),
        "meanFarDistance": round(sum(t["farDistance"] for t in triads) / n_total, 2),
        "meanValenceGapNear": round(
            sum(t["words"]["virtue"]["valence"] - t["words"]["near"]["valence"] for t in triads) / n_total, 2
        ),
        "meanValenceGapFar": round(
            sum(t["words"]["virtue"]["valence"] - t["words"]["far"]["valence"] for t in triads) / n_total, 2
        ),
        "exceptions": [t["virtue"] for t in triads if t["nearDistance"] >= t["farDistance"]],
    }

    header = '''// GENERATED FILE. Edit scripts/plotted/build-near-enemies.py and re-run it.
//
// Twenty-one virtue / near-enemy / far-enemy triads, scored against the Warriner
// et al. (2013) affective norms: 13,915 English lemmas rated by roughly 1,827
// people on valence (pleasantness), arousal (intensity) and dominance (sense of
// control), each on a 1 to 9 scale.
//
// The triads come from Ant's working list. The ratings come from raters who were
// answering an unrelated psycholinguistics questionnaire and had never heard of
// near enemies, which is what makes the test worth running: nothing in the source
// data was collected to make this framework look good.
//
// Distances are Euclidean, computed in the valence-by-dominance plane.
//
// Source: Warriner, A. B., Kuperman, V., & Brysbaert, M. (2013). "Norms of valence,
// arousal, and dominance for 13,915 English lemmas." Behavior Research Methods,
// 45(4), 1191-1207. Ratings mirror: github.com/JULIELab/XANEW (CC BY-NC-SA 3.0).

export interface WordScore {
  word: string;
  valence: number;
  arousal: number;
  dominance: number;
  raters: number;
}

export interface Triad {
  virtue: string;
  gloss: string;
  /** The near enemy as Ant originally phrased it, before the single-word proxy. */
  antNearEnemy: string;
  words: { virtue: WordScore; near: WordScore; far: WordScore };
  /** Euclidean distance from the virtue in valence-by-dominance space. */
  nearDistance: number;
  farDistance: number;
  /** Present when the single-word proxy is a lossy stand-in for the real idea. */
  proxyNote?: string;
}

export interface Summary {
  triads: number;
  nearCloserCount: number;
  meanNearDistance: number;
  meanFarDistance: number;
  meanValenceGapNear: number;
  meanValenceGapFar: number;
  exceptions: string[];
}

'''

    body = (
        "export const triads: Triad[] = "
        + json.dumps(triads, indent=2)
        + ";\n\nexport const summary: Summary = "
        + json.dumps(summary, indent=2)
        + ";\n"
    )

    OUT.write_text(header + body)
    print(f"wrote {OUT.relative_to(Path(__file__).resolve().parents[2])}")
    print(f"  {n_closer}/{n_total} triads: near enemy closer than far enemy")
    print(f"  mean distance  near {summary['meanNearDistance']}  far {summary['meanFarDistance']}")
    print(f"  exceptions: {summary['exceptions'] or 'none'}")


if __name__ == "__main__":
    main()
