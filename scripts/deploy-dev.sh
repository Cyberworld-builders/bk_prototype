#!/bin/bash

echo "🚀 Deploying BK Demo in Development Mode with Hot Reload..."
echo "🌐 URL: https://bk-demo.cyberworldbuilders.dev"
echo "🔧 Port: 3011 (local access)"

# Stop any existing containers
docker compose -f docker-compose.yml -f docker-compose.dev.yml down

# Start with development overrides
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

echo "✅ Development deployment complete!"
echo "📝 Logs: docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f" 