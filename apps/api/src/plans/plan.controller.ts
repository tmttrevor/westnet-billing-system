import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { PlanService } from './plan.service';
@Controller('plans')
export class PlanController {
  constructor(private readonly plans:PlanService) {}
  @Post() create(@Headers('x-tenant-id') tenantId:string,@Body() body:{name:string;price:number;durationMinutes:number;active?:boolean}) {
    return this.plans.create({tenantId,...body,active:body.active ?? true});
  }
  @Get() list(@Headers('x-tenant-id') tenantId:string){return this.plans.list(tenantId);}
  @Get(':id') get(@Headers('x-tenant-id') tenantId:string,@Param('id') id:string){return this.plans.get(tenantId,id);}
}
