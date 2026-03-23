#!/bin/sh
echo "Running database migrations..."
node node_modules/prisma/build/index.js migrate deploy || echo "WARNING: Migration failed, continuing anyway..."
echo "Starting server..."
exec node server.js
