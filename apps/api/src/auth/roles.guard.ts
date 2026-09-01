import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppRole, ROLES_KEY } from './roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
 constructor(private readonly reflector:Reflector){}
 canActivate(ctx:ExecutionContext){const roles=this.reflector.getAllAndOverride<AppRole[]>(ROLES_KEY,[ctx.getHandler(),ctx.getClass()]);if(!roles?.length)return true;const user=ctx.switchToHttp().getRequest().user;if(!user||!roles.includes(user.role))throw new ForbiddenException('Insufficient permissions');return true;}
}
