#!/usr/bin/env sh
set -eu
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"

printf 'Checking health...\n'
curl --fail --silent --show-error "$BASE_URL/health"
printf '\nHealth check passed.\n'

printf 'Checking API reachability...\n'
curl --fail --silent --show-error "$BASE_URL/health" >/dev/null
printf 'Smoke test completed successfully.\n'
