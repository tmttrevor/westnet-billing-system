# WestNet Release Checklist

## Build
- [ ] Install dependencies with lockfiles.
- [ ] Generate Prisma client.
- [ ] Run Prisma migrations against staging.
- [ ] Build API successfully.
- [ ] Run automated tests where available.

## Security
- [ ] Set production secrets outside GitHub.
- [ ] Set TENANT_ONBOARDING_TOKEN.
- [ ] Restrict CORS_ORIGIN to approved frontend domains.
- [ ] Confirm HTTPS at the public reverse proxy.
- [ ] Confirm M-PESA callback URL is publicly reachable over HTTPS.

## Operations
- [ ] Verify database backup and restore.
- [ ] Verify /health.
- [ ] Test provisioning retry recovery.

## Acceptance
- [ ] M-PESA sandbox payment succeeds.
- [ ] Duplicate callback does not double-charge or double-activate.
- [ ] Failed payment does not activate service.
- [ ] Authorized MikroTik/UniFi test provisioning succeeds.
