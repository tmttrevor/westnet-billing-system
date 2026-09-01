# Production Acceptance Checklist

## Before launch
- [ ] Run npm ci, Prisma generation, and production build successfully.
- [ ] Apply reviewed Prisma migrations to staging first.
- [ ] Set strong production secrets outside GitHub.
- [ ] Verify HTTPS for the M-PESA callback URL.
- [ ] Run the health endpoint after deployment.

## Payment validation
- [ ] Complete a sandbox STK Push.
- [ ] Verify pending payment persistence and callback correlation.
- [ ] Verify duplicate callbacks are idempotent.
- [ ] Verify failed payments do not activate service.

## Provisioning validation
- [ ] Confirm a paid subscription creates a persistent job.
- [ ] Verify authorized test-router provisioning.
- [ ] Verify retry/backoff and terminal failure.

## Recovery
- [ ] Create a database backup.
- [ ] Restore into a non-production database and verify data.
