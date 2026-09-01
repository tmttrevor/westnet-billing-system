import { Body, Controller, Post } from '@nestjs/common';
import { PrismaAuthService } from './prisma-auth.service';
import { JwtService } from './jwt.service';

@Controller('auth')
export class AuthController {
 constructor(private readonly auth:PrismaAuthService,private readonly jwt:JwtService){}
 @Post('register') async register(@Body() body:{email:string;password:string;tenantId?:string}) { return this.auth.register(body); }
 @Post('login') async login(@Body() body:{email:string;password:string}) { const user=await this.auth.validate(body.email,body.password); return {accessToken:this.jwt.sign(user),user}; }
}
