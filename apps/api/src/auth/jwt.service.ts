import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';

export type JwtUser={id:string;email:string;tenantId:string|null;role:string};
@Injectable()
export class JwtService {
  private secret(){const s=process.env.JWT_SECRET;if(!s) throw new Error('JWT_SECRET is required');return s;}
  private b64(v:Buffer|string){return Buffer.from(v).toString('base64url');}
  sign(user:JwtUser){const header=this.b64(JSON.stringify({alg:'HS256',typ:'JWT'}));const payload=this.b64(JSON.stringify({sub:user.id,email:user.email,tenantId:user.tenantId,role:user.role,exp:Math.floor(Date.now()/1000)+60*60*24}));const sig=createHmac('sha256',this.secret()).update(`${header}.${payload}`).digest('base64url');return `${header}.${payload}.${sig}`;}
  verify(token:string):JwtUser {const [h,p,s]=token.split('.');if(!h||!p||!s) throw new UnauthorizedException('Invalid token');const expected=createHmac('sha256',this.secret()).update(`${h}.${p}`).digest('base64url');if(expected.length!==s.length||!timingSafeEqual(Buffer.from(expected),Buffer.from(s))) throw new UnauthorizedException('Invalid token');const payload=JSON.parse(Buffer.from(p,'base64url').toString());if(payload.exp<=Math.floor(Date.now()/1000)) throw new UnauthorizedException('Token expired');return {id:payload.sub,email:payload.email,tenantId:payload.tenantId??null,role:payload.role};}
}
