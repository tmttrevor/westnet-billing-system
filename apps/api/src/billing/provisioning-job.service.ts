import { Injectable, Logger } from '@nestjs/common';

export type ProvisioningJob = { id:string; tenantId:string; customerId:string; subscriptionId:string; routerId:string; attempts:number; status:'QUEUED'|'RUNNING'|'SUCCESS'|'FAILED' };

@Injectable()
export class ProvisioningJobService {
  private readonly logger = new Logger(ProvisioningJobService.name);
  private readonly jobs = new Map<string, ProvisioningJob>();

  enqueue(input: Omit<ProvisioningJob,'id'|'attempts'|'status'>) {
    const job: ProvisioningJob = { id: crypto.randomUUID(), ...input, attempts: 0, status: 'QUEUED' };
    this.jobs.set(job.id, job);
    return job;
  }

  async run(id:string, worker:(job:ProvisioningJob)=>Promise<void>) {
    const job=this.jobs.get(id); if(!job) return;
    job.status='RUNNING'; job.attempts++;
    try { await worker(job); job.status='SUCCESS'; }
    catch(error) { job.status='FAILED'; this.logger.error(`Provisioning job ${id} failed`); throw error; }
    return job;
  }
}
