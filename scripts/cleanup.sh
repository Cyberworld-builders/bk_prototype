#!/bin/bash

echo "🧹 Cleaning up BK Demo containers..."

# Stop and remove containers for both dev and prod
docker compose -f docker-compose.yml -f docker-compose.dev.yml down
docker compose down

# Remove any orphaned containers
docker container prune -f

# Optionally remove the built image (uncomment if needed)
# docker image rm bk_prototype-bk-demo 2>/dev/null || true

echo "✅ Cleanup complete!" 