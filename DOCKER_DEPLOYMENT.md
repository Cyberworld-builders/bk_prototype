# BK Assistant Demo - Docker Deployment

This document explains how to deploy the BK Assistant Property Questionnaire demo using Docker with Traefik integration.

## 🚀 Quick Start

### Development Mode (with Hot Reload)
```bash
./scripts/deploy-dev.sh
```

### Production Mode
```bash
./scripts/deploy-prod.sh
```

### Cleanup
```bash
./scripts/cleanup.sh
```

## 📋 Configuration Details

### Domain & Port
- **Public URL**: https://bk-demo.cyberworldbuilders.dev
- **Local Port**: 3011 (development mode only)
- **Internal Port**: 3011 (container)

### Network
- **Network**: `traefik-net` (external)
- **SSL**: Automatic via Let's Encrypt
- **Load Balancer**: Traefik

## 🔧 Files Overview

### Docker Configuration
- `docker-compose.yml` - Production configuration
- `docker-compose.dev.yml` - Development overrides for hot reload
- `Dockerfile` - Production-optimized build
- `.dockerignore` - Excludes unnecessary files from build

### Scripts
- `scripts/deploy-dev.sh` - Deploy with hot reload for development
- `scripts/deploy-prod.sh` - Deploy optimized production build
- `scripts/cleanup.sh` - Stop and clean up containers

## 🏗️ Traefik Labels

The following Traefik labels are configured:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.docker.network=traefik-net"
  - "traefik.http.routers.bk-demo.entrypoints=websecure"
  - "traefik.http.routers.bk-demo.rule=Host(`bk-demo.cyberworldbuilders.dev`)"
  - "traefik.http.routers.bk-demo.tls=true"
  - "traefik.http.routers.bk-demo.tls.certresolver=letsencrypt"
  - "traefik.http.services.bk-demo.loadbalancer.server.port=3011"
```

## 🔍 Development Features

### Hot Reload
- Volume mounts source code for live updates
- Node modules cached in separate volume
- Next.js build cache persisted
- File watching with polling for Docker compatibility

### Environment Variables
```env
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
CHOKIDAR_USEPOLLING=true
PORT=3011
```

## 📝 Manual Commands

### Development
```bash
# Start development
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# View logs
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

# Stop
docker compose -f docker-compose.yml -f docker-compose.dev.yml down
```

### Production
```bash
# Build and start
docker compose up -d --build

# View logs
docker compose logs -f

# Stop
docker compose down
```

## 🐛 Troubleshooting

### Check Container Status
```bash
docker ps | grep bk-demo
```

### View Logs
```bash
docker logs bk-demo
```

### Restart Container
```bash
docker compose restart bk-demo
```

### Rebuild Image
```bash
docker compose up -d --build --force-recreate
```

## 🔒 Security Notes

- Containers run on isolated Docker network
- SSL/TLS terminated by Traefik
- No direct port exposure in production mode
- Environment variables properly isolated 