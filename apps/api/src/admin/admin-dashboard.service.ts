import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AdminDashboardService {
 constructor(private readonly prisma:PrismaService){}
 async summary(tenantId:string){
  const [customers,plans,activeSubscriptions,payments]=await Promise.all([
   this.prisma.customer.count({where:{tenantId}}),
   this.prisma.plan.count({where:{tenantId,active:true}}),
   this.prisma.subscription.count({where:{tenantId,status:'ACTIVE'}}),
   this.prisma.payment.aggregate({where:{tenantId,status:'SUCCESS'},_sum:{amount:true},_count:true}),
  ]);
  return {customers,activePlans:plans,activeSubscriptions,successfulPayments:payments._count,revenue:Number(payments._sum.amount||0)};
 }
}
