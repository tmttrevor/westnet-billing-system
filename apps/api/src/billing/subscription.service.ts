import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) {}
  async activate(tenantId:string,customerId:string,planId:string) {
    const [customer,plan]=await Promise.all([
      this.prisma.customer.findFirst({where:{id:customerId,tenantId}}),
      this.prisma.plan.findFirst({where:{id:planId,tenantId}}),
    ]);
    if(!customer || !plan) throw new NotFoundException('Customer or plan not found');
    const startsAt=new Date();
    const expiresAt=new Date(startsAt.getTime()+plan.durationMinutes*60_000);
    return this.prisma.subscription.create({data:{customerId,planId,startsAt,expiresAt,status:'ACTIVE'}});
  }
  async expireDue() {
    return this.prisma.subscription.updateMany({where:{status:'ACTIVE',expiresAt:{lte:new Date()}},data:{status:'EXPIRED'}});
  }
}
