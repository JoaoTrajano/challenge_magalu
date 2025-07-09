#!/bin/sh
set -e

npx prisma migrate deploy --schema=./src/shared/infrastructure/database/postgres/adapters/prisma/schema.prisma
npx prisma generate --schema=./src/shared/infrastructure/database/postgres/adapters/prisma/schema.prisma

exec "$@"
