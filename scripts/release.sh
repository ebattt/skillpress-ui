#!/usr/bin/env bash
# release.sh — git-dep distribution release helper for @ebattt/skillpress-ui
#
# Esegue, in ordine:
#   1. npm run check         (catena completa dei controlli)
#   2. npm run build:dist
#   3. npm run build:public-api
#   4. git add bundles/ dist/
#   5. git commit -m "build: <tag> artifacts"  (skip se tree pulito)
#   6. git tag <tag>
#   7. Stampa istruzioni di push manuale
#
# Lo script NON esegue git push: il push lo fa l'orchestratore separatamente.
#
# Uso:
#   ./scripts/release.sh v0.4.0-gitdep.1
#
# Pattern tag accettato: vX.Y.Z oppure vX.Y.Z-gitdep.N

set -euo pipefail

# ----- Argomenti --------------------------------------------------------------

if [[ $# -lt 1 ]]; then
  echo "ERROR: tag mancante." >&2
  echo "Uso: $0 vX.Y.Z[-gitdep.N]" >&2
  exit 64
fi

TAG="$1"

# Validazione pattern: vX.Y.Z oppure vX.Y.Z-gitdep.N
TAG_PATTERN='^v[0-9]+\.[0-9]+\.[0-9]+(-gitdep\.[0-9]+)?$'
if [[ ! "$TAG" =~ $TAG_PATTERN ]]; then
  echo "ERROR: tag '$TAG' non rispetta il pattern vX.Y.Z[-gitdep.N]." >&2
  exit 65
fi

# ----- Setup ------------------------------------------------------------------

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${REPO_ROOT}"

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

echo ">> Repo:    ${REPO_ROOT}"
echo ">> Branch:  ${CURRENT_BRANCH}"
echo ">> Tag:     ${TAG}"
echo

# Tag esistente? Non sovrascrivere mai.
if git rev-parse -q --verify "refs/tags/${TAG}" >/dev/null; then
  echo "ERROR: tag '${TAG}' esiste gia' in locale. Scegli un nuovo tag." >&2
  exit 66
fi

# ----- Build ------------------------------------------------------------------

echo ">> [1/6] npm run check"
npm run check

echo
echo ">> [2/6] npm run build:dist"
npm run build:dist

echo
echo ">> [3/6] npm run build:public-api"
npm run build:public-api

# ----- Commit artefatti -------------------------------------------------------

echo
echo ">> [4/6] git add bundles/ dist/"
git add bundles/ dist/

# Se non c'e' nulla da committare nelle cartelle artefatti, salta il commit.
if git diff --cached --quiet -- bundles/ dist/; then
  echo ">> [5/6] nessuna modifica in bundles/ o dist/: skip commit."
else
  echo ">> [5/6] git commit -m 'build: ${TAG} artifacts'"
  git commit -m "build: ${TAG} artifacts"
fi

# ----- Tag --------------------------------------------------------------------

echo
echo ">> [6/6] git tag ${TAG}"
git tag "${TAG}"

# ----- Istruzioni push --------------------------------------------------------

echo
echo "============================================================"
echo "OK. Tag '${TAG}' creato in locale sul branch '${CURRENT_BRANCH}'."
echo
echo "Push manuale (eseguire come orchestratore, non da questo script):"
echo
echo "    git push -u origin ${CURRENT_BRANCH}"
echo "    git push origin ${TAG}"
echo "============================================================"
