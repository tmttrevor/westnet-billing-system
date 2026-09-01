import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from './jwt.service';
@Injectable()
export class JwtGuard implements CanActivate {
 constructor(private readonly jwt:JwtService){}
 canActivate(ctx:ExecutionContext){const req=ctx.switchToHttp().getRequest();const value=req.headers.authorization;if(!value?.startsWith('Bearer ')) throw new UnauthorizedException('Bearer token required');req.user=this.jwt.verify(value.slice(7));return true;}
}
