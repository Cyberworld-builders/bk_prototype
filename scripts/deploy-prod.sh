#!/bin/bash

echo "🚀 Deploying BK Demo in Production Mode..."
echo "🌐 URL: https://bk-demo.cyberworldbuilders.dev"

# Stop any existing containers
docker compose down

# Build and start production containers
docker compose up -d --build

echo "✅ Production deployment complete!"
echo "📝 Logs: docker compose logs -f" 