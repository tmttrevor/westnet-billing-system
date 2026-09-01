import { Injectable, Logger } from '@nestjs/common';

export type ProvisioningJob={id:string;attempts:number;status:'QUEUED'|'RUNNING'|'SUCCESS'|'FAILED';tenantId:string;customerId:string;subscriptionId:string;routerId?:string};

@Injectable()
export class ProvisioningJobWorkerService {
  private readonly logger=new Logger(ProvisioningJobWorkerService.name);
  private readonly maxAttempts=3;
  async process(job:ProvisioningJob, execute:(job:ProvisioningJob)=>Promise<void>) {
    if(job.status==='SUCCESS') return job;
    let lastError:unknown;
    for(let attempt=job.attempts+1;attempt<=this.maxAttempts;attempt++){
      job.status='RUNNING'; job.attempts=attempt;
      try { await execute(job); job.status='SUCCESS'; return job; }
      catch(error){ lastError=error; this.logger.error(`Provisioning job ${job.id} failed on attempt ${attempt}`); }
    }
    job.status='FAILED';
    throw lastError;
  }
}
