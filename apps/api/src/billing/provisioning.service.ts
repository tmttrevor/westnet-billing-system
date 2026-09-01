import { Injectable } from '@nestjs/common';
import { ProvisioningJobService } from './provisioning-job.service';

export type ProvisioningRequest = { tenantId:string; customerId:string; subscriptionId:string; routerId:string };

@Injectable()
export class ProvisioningService {
  constructor(private readonly jobs: ProvisioningJobService) {}
  async provisionAfterConfirmedPayment(input: ProvisioningRequest) {
    // Router credentials are resolved server-side. Never accept router secrets from clients.
    const job=this.jobs.enqueue(input);
    return { queued: true, jobId: job.id };
  }
}
