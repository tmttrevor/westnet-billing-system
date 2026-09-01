import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MpesaService } from './mpesa.service';
import { PaymentLedgerService } from './payment-ledger.service';

@Injectable()
export class PaymentOrchestratorService {
  constructor(private prisma: PrismaService, private mpesa: MpesaService, private ledger: PaymentLedgerService) {}

  async startStkPush(input:{tenantId:string;customerId:string;planId:string;phone:string;routerId?:string}) {
    const [customer,plan]=await Promise.all([
      this.prisma.customer.findFirst({where:{id:input.customerId,tenantId:input.tenantId}}),
      this.prisma.plan.findFirst({where:{id:input.planId,tenantId:input.tenantId}}),
    ]);
    if(!customer || !plan) throw new NotFoundException('Customer or plan not found');
    if(!plan.durationMinutes || Number(plan.price)<=0) throw new BadRequestException('Plan is not billable');
    const reference=`WN-${crypto.randomUUID()}`;
    const payment=await this.ledger.createPending({tenantId:input.tenantId,customerId:input.customerId,planId:input.planId,routerId:input.routerId,reference,phone:input.phone,amount:Number(plan.price)});
    try {
      const response:any=await this.mpesa.stkPush({phone:input.phone,amount:Number(plan.price),accountReference:reference,transactionDesc:`Internet plan ${plan.name}`});
      await this.ledger.attachProviderRequest(payment.id,response.CheckoutRequestID,response.MerchantRequestID);
      return {paymentId:payment.id,reference,checkoutRequestId:response.CheckoutRequestID,merchantRequestId:response.MerchantRequestID,response};
    } catch (error) {
      await this.prisma.payment.update({where:{id:payment.id},data:{status:'FAILED'}});
      throw error;
    }
  }
}
