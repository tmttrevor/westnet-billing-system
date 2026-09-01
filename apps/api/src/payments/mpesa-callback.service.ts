import { BadRequestException, Injectable } from '@nestjs/common';
import { parseMpesaCallback } from './mpesa-callback.parser';
import { PaymentLedgerService } from './payment-ledger.service';
import { SubscriptionService } from '../billing/subscription.service';
import { ProvisioningService } from '../billing/provisioning.service';

@Injectable()
export class MpesaCallbackService {
  constructor(private readonly ledger: PaymentLedgerService, private readonly subscriptions: SubscriptionService, private readonly provisioning: ProvisioningService) {}

  async handle(payload: unknown) {
    const callback=parseMpesaCallback(payload as any);
    if(callback.resultCode!==0) return {received:true,successful:false,resultCode:callback.resultCode};
    if(!callback.receipt || !callback.checkoutRequestId) throw new BadRequestException('Incomplete successful M-PESA callback');
    const existing=await this.ledger.findByCheckoutRequestId(callback.checkoutRequestId);
    if(existing.status==='SUCCESS') return {received:true,successful:true,duplicate:true,paymentId:existing.id};
    const payment=await this.ledger.markSuccessfulByCheckoutRequestId(callback.checkoutRequestId,callback.receipt,payload);
    const subscription=await this.subscriptions.activate(payment.tenantId,payment.customerId,payment.planId);
    if(payment.routerId) await this.provisioning.provisionAfterConfirmedPayment({tenantId:payment.tenantId,customerId:payment.customerId,subscriptionId:subscription.id,routerId:payment.routerId});
    return {received:true,successful:true,paymentId:payment.id,subscriptionId:subscription.id};
  }
}
