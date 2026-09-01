import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
@Injectable()
export class OnboardingGuard implements CanActivate {
 canActivate(context:ExecutionContext){
  const expected=process.env.TENANT_ONBOARDING_TOKEN;
  if(!expected) throw new ForbiddenException('Tenant onboarding is disabled');
  const provided=context.switchToHttp().getRequest().headers['x-onboarding-token'];
  if(typeof provided!=='string'||provided!==expected) throw new ForbiddenException('Invalid onboarding token');
  return true;
 }
}
