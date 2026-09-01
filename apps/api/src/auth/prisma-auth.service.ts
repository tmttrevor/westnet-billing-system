import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordService } from './password.service';

@Injectable()
export class PrismaAuthService {
  constructor(private prisma:PrismaService,private passwords:PasswordService) {}
  async register(input:{email:string;password:string;tenantId?:string;role?:'SUPER_ADMIN'|'ISP_ADMIN'|'STAFF'}) {
    const email=input.email.trim().toLowerCase();
    const exists=await this.prisma.user.findUnique({where:{email}});
    if(exists) throw new ConflictException('Account already exists');
    const passwordHash=await this.passwords.hash(input.password);
    const user=await this.prisma.user.create({data:{email,passwordHash,tenantId:input.tenantId,role:input.role||'STAFF'}});
    return {id:user.id,email:user.email,tenantId:user.tenantId,role:user.role};
  }
  async validate(email:string,password:string) {
    const user=await this.prisma.user.findUnique({where:{email:email.trim().toLowerCase()}});
    if(!user||!(await this.passwords.verify(password,user.passwordHash))) throw new UnauthorizedException('Invalid credentials');
    return {id:user.id,email:user.email,tenantId:user.tenantId,role:user.role};
  }
}
