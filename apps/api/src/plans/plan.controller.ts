import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PrismaPlanService } from './prisma-plan.service';
import { JwtGuard } from '../auth/jwt.guard';
import { TenantGuard } from '../common/tenant/tenant.guard';
import { TenantId } from '../common/tenant/tenant.decorator';

@UseGuards(JwtGuard,TenantGuard)
@Controller('plans')
export class PlanController {
 constructor(private readonly plans:PrismaPlanService){}
 @Post() create(@TenantId() tenantId:string,@Body() body:{name:string;price:number;durationMinutes:number;active?:boolean}) {return this.plans.create(tenantId,body);}
 @Get() list(@TenantId() tenantId:string){return this.plans.list(tenantId);}
 @Get(':id') get(@TenantId() tenantId:string,@Param('id') id:string){return this.plans.get(tenantId,id);}
}
