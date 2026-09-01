import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentStateService } from './payment-state.service';

@Injectable()
export class PaymentLedgerService {
  constructor(private prisma:PrismaService, private states:PaymentStateService) {}

  createPending(input:{tenantId:string;customerId:string;planId:string;routerId?:string;reference:string;phone:string;amount:number}) {
    return this.prisma.payment.create({data:{...input,status:'PENDING'}});
  }

  attachProviderRequest(paymentId:string, checkoutRequestId?:string, merchantRequestId?:string) {
    return this.prisma.payment.update({where:{id:paymentId},data:{checkoutRequestId,merchantRequestId}});
  }

  async findByCheckoutRequestId(checkoutRequestId:string) {
    const payment=await this.prisma.payment.findUnique({where:{checkoutRequestId}});
    if(!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async markSuccessfulByCheckoutRequestId(checkoutRequestId:string, receipt:string, rawCallback:unknown) {
    const payment=await this.findByCheckoutRequestId(checkoutRequestId);
    if(payment.status==='SUCCESS') return payment;
    this.states.transition(payment.status,'SUCCESS');
    return this.prisma.payment.update({where:{id:payment.id},data:{status:'SUCCESS',providerReceipt:receipt,rawCallback:rawCallback as object,processedAt:new Date()}});
  }
}
