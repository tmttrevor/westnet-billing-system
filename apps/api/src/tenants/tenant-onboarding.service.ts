import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordService } from '../auth/password.service';
@Injectable()
export class TenantOnboardingService {
 constructor(private prisma:PrismaService,private passwords:PasswordService){}
 async onboard(input:{name:string;email:string;password:string}){
  const existing=await this.prisma.user.findUnique({where:{email:input.email}});if(existing)throw new ConflictException('Email already registered');
  const tenant=await this.prisma.tenant.create({data:{name:input.name}});
  const hash=await this.passwords.hash(input.password);
  const user=await this.prisma.user.create({data:{email:input.email,passwordHash:hash,tenantId:tenant.id,role:'TENANT_ADMIN'}});
  return {tenant:{id:tenant.id,name:tenant.name},admin:{id:user.id,email:user.email,role:user.role}};
 }
}
