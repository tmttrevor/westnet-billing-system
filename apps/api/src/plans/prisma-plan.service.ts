import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaPlanService {
  constructor(private readonly prisma: PrismaService) {}
  create(tenantId:string,input:{name:string;price:number;durationMinutes:number;active?:boolean}) {
    return this.prisma.plan.create({ data:{ tenantId, name:input.name, price:input.price, durationMinutes:input.durationMinutes } });
  }
  list(tenantId:string) { return this.prisma.plan.findMany({ where:{ tenantId } }); }
  async get(tenantId:string,id:string) {
    const plan=await this.prisma.plan.findFirst({ where:{ id, tenantId } });
    if(!plan) throw new NotFoundException('Plan not found');
    return plan;
  }
}
