import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context:ExecutionContext) {
    const request=context.switchToHttp().getRequest();
    if(!request.user) throw new UnauthorizedException('Authentication required');
    if(request.user.role !== 'SUPER_ADMIN' && !request.user.tenantId) throw new UnauthorizedException('Tenant access required');
    return true;
  }
}
