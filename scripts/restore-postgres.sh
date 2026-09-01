#!/usr/bin/env sh
set -eu
FILE="${1:?Usage: restore-postgres.sh backup.sql.gz}"
test -f "$FILE"
gzip -dc "$FILE" | docker compose -f docker-compose.prod.yml exec -T postgres psql -U "$POSTGRES_USER" "$POSTGRES_DB"
echo "Restore completed. Verify application health and database integrity."
