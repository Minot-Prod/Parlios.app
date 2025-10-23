#!/usr/bin/env bash
set -euo pipefail
echo "[qa] Placeholder — ajouter lint/tests du repo."
if [ -f package.json ]; then
  if command -v pnpm >/dev/null 2>&1; then
    pnpm -s lint || true
    pnpm -s test || true
  else
    npm run -s lint || true
    npm test -s || true
  fi
fi