# WestNet Billing System

Multi-tenant ISP and Wi-Fi hotspot billing platform.

## Stack
- Node.js + NestJS API
- PostgreSQL + Prisma
- React admin portal
- MikroTik + UniFi adapters
- M-PESA integration interface
- Docker Compose

## Quick start
1. Copy `.env.example` to `.env` and configure values.
2. Run `docker compose up --build`.
3. API health check: `GET /health`.

## Security
Never commit M-PESA secrets, router passwords, database passwords, or JWT production secrets.

## Project status
Initial foundation: multi-tenant schema, billing domain, payment abstraction, router abstraction, and deployment skeleton. Production M-PESA activation requires approved Safaricom credentials and callback configuration.
