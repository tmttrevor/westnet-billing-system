import { Injectable } from '@nestjs/common';

export type ProvisioningRequest = { tenantId:string; customerId:string; subscriptionId:string; routerId:string };

@Injectable()
export class ProvisioningService {
  async provisionAfterConfirmedPayment(input: ProvisioningRequest) {
    // Router credentials are resolved server-side. Never accept router secrets from clients.
    return { queued: true, ...input };
  }
}
