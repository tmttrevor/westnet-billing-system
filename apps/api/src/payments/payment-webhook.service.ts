import { Injectable } from '@nestjs/common';
import { PaymentLedgerService } from './payment-ledger.service';
import { SubscriptionService } from '../billing/subscription.service';
import { ProvisioningService } from '../billing/provisioning.service';

@Injectable()
export class PaymentWebhookService {
  constructor(private ledger:PaymentLedgerService, private subscriptions:SubscriptionService, private provisioning:ProvisioningService) {}
  async processConfirmedPayment(input:{tenantId:string;reference:string;receipt:string;rawCallback:unknown;customerId:string;planId:string;routerId:string}) {
    const payment=await this.ledger.markSuccessful(input.tenantId,input.reference,input.receipt,input.rawCallback);
    const subscription=await this.subscriptions.activate(input.tenantId,input.customerId,input.planId);
    await this.provisioning.provisionAfterConfirmedPayment({tenantId:input.tenantId,customerId:input.customerId,subscriptionId:subscription.id,routerId:input.routerId});
    return {payment,subscription};
  }
}
