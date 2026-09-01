# WestNet Billing System

Multi-tenant ISP and Wi-Fi hotspot billing platform.

## Stack
- Node.js + NestJS API
- PostgreSQL + Prisma
- React admin portal
- MikroTik + UniFi integration architecture
- M-PESA payment integration architecture
- Docker Compose

## Core workflow
Customer -> plan -> M-PESA STK Push -> payment ledger -> callback processing -> subscription -> persistent provisioning job -> router adapter.

## Production deployment
1. Configure PostgreSQL and API secrets from `apps/api/.env.production.example`.
2. Create and test Prisma migrations before deployment.
3. Build and start with `docker compose -f docker-compose.prod.yml up -d --build`.
4. Put the API behind an HTTPS reverse proxy.
5. Verify `GET /health` before accepting production traffic.

## Security
Never commit M-PESA secrets, router passwords, database passwords, or JWT production secrets. Router credentials must remain server-side and should be encrypted at rest.

## Important production validation
Before resale or live ISP use, complete an end-to-end test with real approved infrastructure: database migrations, M-PESA sandbox/production credentials, HTTPS callback delivery, MikroTik/UniFi authorization, duplicate callback handling, and provisioning retry recovery.
