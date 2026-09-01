#!/usr/bin/env sh
set -eu
OUT_DIR="${BACKUP_DIR:-./backups}"
STAMP="$(date +%Y%m%d-%H%M%S)"
mkdir -p "$OUT_DIR"
docker compose -f docker-compose.prod.yml exec -T postgres pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" | gzip > "$OUT_DIR/westnet-$STAMP.sql.gz"
echo "Backup written to $OUT_DIR/westnet-$STAMP.sql.gz"
