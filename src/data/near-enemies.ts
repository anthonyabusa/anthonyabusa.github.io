// GENERATED FILE. Edit scripts/plotted/build-near-enemies.py and re-run it.
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

export const triads: Triad[] = [
  {
    "virtue": "Hope",
    "gloss": "Hope plans a route to better; optimism assumes one exists.",
    "antNearEnemy": "optimism",
    "words": {
      "virtue": {
        "word": "hope",
        "valence": 7.48,
        "arousal": 5.29,
        "dominance": 6.78,
        "raters": 21
      },
      "near": {
        "word": "optimism",
        "valence": 7.21,
        "arousal": 4.95,
        "dominance": 6.9,
        "raters": 39
      },
      "far": {
        "word": "despair",
        "valence": 3.61,
        "arousal": 4.64,
        "dominance": 4.05,
        "raters": 23
      }
    },
    "nearDistance": 0.3,
    "farDistance": 4.74
  },
  {
    "virtue": "Empathy",
    "gloss": "Empathy feels with; sympathy feels sorry for.",
    "antNearEnemy": "sympathy",
    "words": {
      "virtue": {
        "word": "empathy",
        "valence": 7.29,
        "arousal": 3.62,
        "dominance": 5.9,
        "raters": 21
      },
      "near": {
        "word": "sympathy",
        "valence": 6.57,
        "arousal": 3.08,
        "dominance": 5.9,
        "raters": 21
      },
      "far": {
        "word": "callous",
        "valence": 2.9,
        "arousal": 3.85,
        "dominance": 4.26,
        "raters": 20
      }
    },
    "nearDistance": 0.72,
    "farDistance": 4.69
  },
  {
    "virtue": "Humility",
    "gloss": "Humility knows its size; self-abasement makes itself small.",
    "antNearEnemy": "self-abasement",
    "words": {
      "virtue": {
        "word": "humility",
        "valence": 5.65,
        "arousal": 3.95,
        "dominance": 5.6,
        "raters": 20
      },
      "near": {
        "word": "meek",
        "valence": 4.92,
        "arousal": 3.14,
        "dominance": 5.05,
        "raters": 40
      },
      "far": {
        "word": "conceit",
        "valence": 3.75,
        "arousal": 4.1,
        "dominance": 4.04,
        "raters": 20
      }
    },
    "nearDistance": 0.91,
    "farDistance": 2.46,
    "proxyNote": "'meek' is the nearest single word; the lexicon has no entry for self-abasement."
  },
  {
    "virtue": "Love",
    "gloss": "Love allows freedom; attachment is possessive.",
    "antNearEnemy": "attachment",
    "words": {
      "virtue": {
        "word": "love",
        "valence": 8.0,
        "arousal": 5.36,
        "dominance": 5.92,
        "raters": 37
      },
      "near": {
        "word": "attachment",
        "valence": 6.0,
        "arousal": 2.96,
        "dominance": 6.32,
        "raters": 21
      },
      "far": {
        "word": "hatred",
        "valence": 2.38,
        "arousal": 5.22,
        "dominance": 4.0,
        "raters": 42
      }
    },
    "nearDistance": 2.04,
    "farDistance": 5.94
  },
  {
    "virtue": "Resilience",
    "gloss": "Resilience adapts and returns; stubbornness refuses to adapt.",
    "antNearEnemy": "stubbornness",
    "words": {
      "virtue": {
        "word": "resilient",
        "valence": 5.71,
        "arousal": 4.65,
        "dominance": 5.52,
        "raters": 21
      },
      "near": {
        "word": "stubborn",
        "valence": 3.74,
        "arousal": 4.13,
        "dominance": 5.0,
        "raters": 19
      },
      "far": {
        "word": "helpless",
        "valence": 2.24,
        "arousal": 4.91,
        "dominance": 3.0,
        "raters": 41
      }
    },
    "nearDistance": 2.04,
    "farDistance": 4.29,
    "proxyNote": "'resilient' is used because 'resilience' is not in the lexicon."
  },
  {
    "virtue": "Kindness",
    "gloss": "Kindness comes from care; people-pleasing is shopping for approval.",
    "antNearEnemy": "people-pleasing",
    "words": {
      "virtue": {
        "word": "kindness",
        "valence": 7.65,
        "arousal": 3.96,
        "dominance": 6.95,
        "raters": 102
      },
      "near": {
        "word": "flattery",
        "valence": 5.74,
        "arousal": 5.1,
        "dominance": 5.91,
        "raters": 19
      },
      "far": {
        "word": "cruelty",
        "valence": 2.37,
        "arousal": 5.9,
        "dominance": 2.64,
        "raters": 19
      }
    },
    "nearDistance": 2.17,
    "farDistance": 6.82,
    "proxyNote": "'flattery' is the closest available proxy for people-pleasing."
  },
  {
    "virtue": "Gratitude",
    "gloss": "Gratitude is thankful; obligation feels indebted.",
    "antNearEnemy": "obligation",
    "words": {
      "virtue": {
        "word": "gratitude",
        "valence": 6.67,
        "arousal": 5.09,
        "dominance": 6.71,
        "raters": 21
      },
      "near": {
        "word": "obligation",
        "valence": 4.68,
        "arousal": 5.76,
        "dominance": 5.39,
        "raters": 19
      },
      "far": {
        "word": "ungrateful",
        "valence": 2.68,
        "arousal": 4.71,
        "dominance": 4.74,
        "raters": 19
      }
    },
    "nearDistance": 2.39,
    "farDistance": 4.45
  },
  {
    "virtue": "Discipline",
    "gloss": "Discipline chooses the hard thing; rigidity cannot choose otherwise.",
    "antNearEnemy": "rigidity",
    "words": {
      "virtue": {
        "word": "discipline",
        "valence": 5.9,
        "arousal": 5.8,
        "dominance": 5.96,
        "raters": 20
      },
      "near": {
        "word": "rigid",
        "valence": 3.47,
        "arousal": 4.81,
        "dominance": 4.83,
        "raters": 19
      },
      "far": {
        "word": "laziness",
        "valence": 3.9,
        "arousal": 2.76,
        "dominance": 4.95,
        "raters": 21
      }
    },
    "nearDistance": 2.68,
    "farDistance": 2.24
  },
  {
    "virtue": "Authenticity",
    "gloss": "Authenticity is true to itself; self-righteousness imposes itself on you.",
    "antNearEnemy": "self-righteousness",
    "words": {
      "virtue": {
        "word": "authenticity",
        "valence": 6.81,
        "arousal": 4.42,
        "dominance": 6.23,
        "raters": 21
      },
      "near": {
        "word": "sanctimonious",
        "valence": 4.37,
        "arousal": 4.9,
        "dominance": 5.09,
        "raters": 19
      },
      "far": {
        "word": "phony",
        "valence": 2.52,
        "arousal": 4.4,
        "dominance": 4.09,
        "raters": 21
      }
    },
    "nearDistance": 2.69,
    "farDistance": 4.79,
    "proxyNote": "'sanctimonious' stands in for self-righteousness, which the lexicon lacks."
  },
  {
    "virtue": "Patience",
    "gloss": "Patience waits and still cares; indifference just stopped caring.",
    "antNearEnemy": "indifference",
    "words": {
      "virtue": {
        "word": "patience",
        "valence": 6.62,
        "arousal": 3.16,
        "dominance": 7.18,
        "raters": 21
      },
      "near": {
        "word": "indifference",
        "valence": 4.35,
        "arousal": 3.61,
        "dominance": 5.64,
        "raters": 20
      },
      "far": {
        "word": "impatience",
        "valence": 3.63,
        "arousal": 4.22,
        "dominance": 4.29,
        "raters": 19
      }
    },
    "nearDistance": 2.74,
    "farDistance": 4.16
  },
  {
    "virtue": "Wisdom",
    "gloss": "Wisdom seeks to understand; cunning seeks to maneuver.",
    "antNearEnemy": "cunning",
    "words": {
      "virtue": {
        "word": "wisdom",
        "valence": 7.94,
        "arousal": 3.77,
        "dominance": 7.14,
        "raters": 18
      },
      "near": {
        "word": "cunning",
        "valence": 5.05,
        "arousal": 4.9,
        "dominance": 6.58,
        "raters": 20
      },
      "far": {
        "word": "folly",
        "valence": 4.11,
        "arousal": 4.56,
        "dominance": 3.65,
        "raters": 19
      }
    },
    "nearDistance": 2.94,
    "farDistance": 5.18
  },
  {
    "virtue": "Contentment",
    "gloss": "Contentment is satisfied with what is; apathy stopped caring.",
    "antNearEnemy": "apathy",
    "words": {
      "virtue": {
        "word": "contentment",
        "valence": 6.62,
        "arousal": 4.6,
        "dominance": 6.58,
        "raters": 21
      },
      "near": {
        "word": "apathy",
        "valence": 3.68,
        "arousal": 3.8,
        "dominance": 5.15,
        "raters": 19
      },
      "far": {
        "word": "greed",
        "valence": 2.48,
        "arousal": 4.45,
        "dominance": 4.0,
        "raters": 21
      }
    },
    "nearDistance": 3.27,
    "farDistance": 4.88
  },
  {
    "virtue": "Integrity",
    "gloss": "Integrity holds a principle; rigidity cannot bend at all.",
    "antNearEnemy": "rigidity",
    "words": {
      "virtue": {
        "word": "integrity",
        "valence": 6.11,
        "arousal": 3.36,
        "dominance": 6.96,
        "raters": 19
      },
      "near": {
        "word": "rigid",
        "valence": 3.47,
        "arousal": 4.81,
        "dominance": 4.83,
        "raters": 19
      },
      "far": {
        "word": "dishonesty",
        "valence": 2.05,
        "arousal": 5.39,
        "dominance": 4.32,
        "raters": 20
      }
    },
    "nearDistance": 3.39,
    "farDistance": 4.84
  },
  {
    "virtue": "Peacefulness",
    "gloss": "Peace is calm with awareness; disengagement left the room.",
    "antNearEnemy": "disengagement",
    "words": {
      "virtue": {
        "word": "peace",
        "valence": 7.75,
        "arousal": 4.65,
        "dominance": 7.17,
        "raters": 40
      },
      "near": {
        "word": "detachment",
        "valence": 4.3,
        "arousal": 3.32,
        "dominance": 5.93,
        "raters": 20
      },
      "far": {
        "word": "violence",
        "valence": 2.71,
        "arousal": 5.95,
        "dominance": 3.24,
        "raters": 21
      }
    },
    "nearDistance": 3.67,
    "farDistance": 6.39
  },
  {
    "virtue": "Generosity",
    "gloss": "Generosity is other-focused; martyrdom keeps the receipt.",
    "antNearEnemy": "martyrdom",
    "words": {
      "virtue": {
        "word": "generosity",
        "valence": 7.55,
        "arousal": 4.29,
        "dominance": 6.56,
        "raters": 20
      },
      "near": {
        "word": "martyr",
        "valence": 4.24,
        "arousal": 4.52,
        "dominance": 3.79,
        "raters": 21
      },
      "far": {
        "word": "greed",
        "valence": 2.48,
        "arousal": 4.45,
        "dominance": 4.0,
        "raters": 21
      }
    },
    "nearDistance": 4.32,
    "farDistance": 5.68
  },
  {
    "virtue": "Confidence",
    "gloss": "Confidence is self-assurance; arrogance is self-importance.",
    "antNearEnemy": "arrogance",
    "words": {
      "virtue": {
        "word": "confidence",
        "valence": 6.71,
        "arousal": 4.04,
        "dominance": 6.5,
        "raters": 21
      },
      "near": {
        "word": "arrogance",
        "valence": 2.55,
        "arousal": 4.65,
        "dominance": 5.0,
        "raters": 20
      },
      "far": {
        "word": "insecurity",
        "valence": 2.24,
        "arousal": 4.81,
        "dominance": 3.56,
        "raters": 21
      }
    },
    "nearDistance": 4.42,
    "farDistance": 5.35
  },
  {
    "virtue": "Trust",
    "gloss": "Trust reads the evidence; naivete skips it.",
    "antNearEnemy": "naivete",
    "words": {
      "virtue": {
        "word": "trust",
        "valence": 7.24,
        "arousal": 4.3,
        "dominance": 6.95,
        "raters": 41
      },
      "near": {
        "word": "gullible",
        "valence": 4.16,
        "arousal": 4.06,
        "dominance": 3.59,
        "raters": 19
      },
      "far": {
        "word": "distrust",
        "valence": 2.95,
        "arousal": 4.05,
        "dominance": 3.32,
        "raters": 20
      }
    },
    "nearDistance": 4.56,
    "farDistance": 5.62
  },
  {
    "virtue": "Compassion",
    "gloss": "Compassion moves toward suffering; pity keeps its distance.",
    "antNearEnemy": "pity",
    "words": {
      "virtue": {
        "word": "compassion",
        "valence": 7.9,
        "arousal": 4.5,
        "dominance": 6.36,
        "raters": 21
      },
      "near": {
        "word": "pity",
        "valence": 3.18,
        "arousal": 4.07,
        "dominance": 4.52,
        "raters": 44
      },
      "far": {
        "word": "cruelty",
        "valence": 2.37,
        "arousal": 5.9,
        "dominance": 2.64,
        "raters": 19
      }
    },
    "nearDistance": 5.07,
    "farDistance": 6.66
  },
  {
    "virtue": "Courage",
    "gloss": "Courage faces the risk; recklessness never counted it.",
    "antNearEnemy": "recklessness",
    "words": {
      "virtue": {
        "word": "courage",
        "valence": 7.67,
        "arousal": 5.0,
        "dominance": 7.27,
        "raters": 21
      },
      "near": {
        "word": "reckless",
        "valence": 3.09,
        "arousal": 5.18,
        "dominance": 4.4,
        "raters": 23
      },
      "far": {
        "word": "cowardice",
        "valence": 3.05,
        "arousal": 4.25,
        "dominance": 3.64,
        "raters": 19
      }
    },
    "nearDistance": 5.4,
    "farDistance": 5.88
  },
  {
    "virtue": "Freedom",
    "gloss": "Freedom knows its boundaries; recklessness ignores them.",
    "antNearEnemy": "recklessness",
    "words": {
      "virtue": {
        "word": "freedom",
        "valence": 7.72,
        "arousal": 5.67,
        "dominance": 7.37,
        "raters": 43
      },
      "near": {
        "word": "reckless",
        "valence": 3.09,
        "arousal": 5.18,
        "dominance": 4.4,
        "raters": 23
      },
      "far": {
        "word": "oppression",
        "valence": 2.67,
        "arousal": 4.57,
        "dominance": 2.94,
        "raters": 21
      }
    },
    "nearDistance": 5.5,
    "farDistance": 6.72
  },
  {
    "virtue": "Joy",
    "gloss": "Joy is durable; mania is frantic and thin.",
    "antNearEnemy": "mania",
    "words": {
      "virtue": {
        "word": "joy",
        "valence": 8.21,
        "arousal": 5.55,
        "dominance": 7.0,
        "raters": 19
      },
      "near": {
        "word": "mania",
        "valence": 3.62,
        "arousal": 4.74,
        "dominance": 3.83,
        "raters": 21
      },
      "far": {
        "word": "misery",
        "valence": 2.2,
        "arousal": 4.82,
        "dominance": 3.8,
        "raters": 102
      }
    },
    "nearDistance": 5.58,
    "farDistance": 6.81
  }
];

export const summary: Summary = {
  "triads": 21,
  "nearCloserCount": 20,
  "meanNearDistance": 3.18,
  "meanFarDistance": 5.17,
  "meanValenceGapNear": 2.75,
  "meanValenceGapFar": 4.28,
  "exceptions": [
    "Discipline"
  ]
};
