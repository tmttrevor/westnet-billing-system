import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY='westnet_roles';
export type AppRole='SUPER_ADMIN'|'TENANT_ADMIN'|'STAFF'|'SUPPORT';
export const Roles=(...roles:AppRole[])=>SetMetadata(ROLES_KEY,roles);
