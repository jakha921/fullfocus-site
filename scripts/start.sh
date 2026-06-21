#!/bin/sh
set -eu

echo "Running database migrations..."
node node_modules/prisma/build/index.js migrate deploy

echo "Ensuring admin user..."
node scripts/ensure-admin.mjs

echo "Starting server..."
exec node server.js
