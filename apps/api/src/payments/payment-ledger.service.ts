import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentStateService } from './payment-state.service';

@Injectable()
export class PaymentLedgerService {
  constructor(private prisma:PrismaService, private states:PaymentStateService) {}

  createPending(input:{tenantId:string;reference:string;phone:string;amount:number}) {
    return this.prisma.payment.create({data:{...input,status:'PENDING'}});
  }

  async markSuccessful(tenantId:string, reference:string, receipt:string, rawCallback:unknown) {
    const payment=await this.prisma.payment.findFirst({where:{tenantId,reference}});
    if(!payment) throw new NotFoundException('Payment not found');
    if(payment.status==='SUCCESS') return payment; // idempotent callback handling
    this.states.transition(payment.status,'SUCCESS');
    return this.prisma.payment.update({where:{id:payment.id},data:{status:'SUCCESS',providerReceipt:receipt,rawCallback:rawCallback as object}});
  }
}
