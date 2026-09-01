import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const TenantId = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const tenantId = request.user?.tenantId;
  if (!tenantId) throw new UnauthorizedException('Tenant context missing');
  return tenantId as string;
});
