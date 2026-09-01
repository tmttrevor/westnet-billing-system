import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PrismaCustomerService } from './prisma-customer.service';
import { JwtGuard } from '../auth/jwt.guard';
import { TenantGuard } from '../common/tenant/tenant.guard';
import { TenantId } from '../common/tenant/tenant.decorator';

@UseGuards(JwtGuard,TenantGuard)
@Controller('customers')
export class CustomerController {
 constructor(private readonly customers:PrismaCustomerService){}
 @Post() create(@TenantId() tenantId:string,@Body() body:{name:string;phone:string;email?:string}){return this.customers.create(tenantId,body);}
 @Get() list(@TenantId() tenantId:string){return this.customers.list(tenantId);}
 @Get(':id') get(@TenantId() tenantId:string,@Param('id') id:string){return this.customers.get(tenantId,id);}
}
