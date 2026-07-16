#!/usr/bin/env bash
# Scheduled two-way library sync, for the Hearth launchd job (always-on host).
#
#   1. Pull the Notion "Books" DB into src/content/library/*.md (+ push local
#      reading notes back to Notion page bodies).
#   2. If anything changed, commit and push to the default branch. A push to the
#      Pages branch is a LIVE PUBLISH, so this is deliberately gated: it only
#      runs where PUBLISH_LIBRARY=1 is set (the launchd plist sets it). Without
#      that env, it syncs files locally and stops before pushing.
#
# Enable on Hearth (see com.ant.library-sync.plist), never on Outpost.
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"

echo "=== library sync $(date '+%Y-%m-%d %H:%M:%S') (branch $BRANCH) ==="

# Keep in step with origin before we generate, so the commit applies cleanly.
git pull --ff-only origin "$BRANCH" || echo "warn: pull skipped (diverged or offline)"

python3 scripts/sync-library.py --commit --push

if [ -z "$(git status --porcelain src/content/library)" ]; then
  echo "no book changes; nothing to publish"
  exit 0
fi

git add src/content/library
git commit -m "chore(library): sync bookshelf from Notion Books DB"

if [ "${PUBLISH_LIBRARY:-0}" = "1" ]; then
  git push origin "$BRANCH"
  echo "published: pushed book changes to $BRANCH"
else
  echo "committed locally; PUBLISH_LIBRARY!=1 so NOT pushed (no live publish)"
fi
