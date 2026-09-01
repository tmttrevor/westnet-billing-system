#!/usr/bin/env sh
set -eu

docker compose -f docker-compose.prod.yml pull postgres
docker compose -f docker-compose.prod.yml build api
docker compose -f docker-compose.prod.yml up -d
docker compose -f docker-compose.prod.yml ps

echo "WestNet production services started. Verify /health before exposing the API publicly."
