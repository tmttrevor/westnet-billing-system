import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles, AppRole } from '../auth/roles.decorator';
import { TenantGuard } from '../common/tenant/tenant.guard';
import { TenantId } from '../common/tenant/tenant.decorator';
import { PasswordService } from '../auth/password.service';
@Controller('admin/users')
@UseGuards(JwtGuard,TenantGuard,RolesGuard)
@Roles('SUPER_ADMIN','TENANT_ADMIN')
export class AdminUsersController {
 constructor(private readonly prisma:PrismaService,private readonly passwords:PasswordService){}
 @Get() list(@TenantId() tenantId:string){return this.prisma.user.findMany({where:{tenantId},select:{id:true,email:true,role:true,createdAt:true}});}
 @Post() async create(@TenantId() tenantId:string,@Body() body:{email:string;password:string;role:AppRole}){
  if(body.role==='SUPER_ADMIN') throw new Error('SUPER_ADMIN cannot be created through tenant administration');
  const passwordHash=await this.passwords.hash(body.password);
  return this.prisma.user.create({data:{tenantId,email:body.email,passwordHash,role:body.role},select:{id:true,email:true,role:true}});
 }
}
