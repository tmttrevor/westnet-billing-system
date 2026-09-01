import { Injectable, Logger } from '@nestjs/common';
import { PersistentProvisioningJobService } from './persistent-provisioning-job.service';

@Injectable()
export class ProvisioningJobRunnerService {
  private readonly logger = new Logger(ProvisioningJobRunnerService.name);
  constructor(private readonly jobs: PersistentProvisioningJobService) {}

  async runOne(id: string, execute: (job: any) => Promise<void>) {
    const job = await this.jobs.claim(id);
    try {
      await execute(job);
      return await this.jobs.complete(job.id);
    } catch (error) {
      this.logger.error(`Provisioning job ${job.id} failed`);
      return this.jobs.fail(job.id, error);
    }
  }
}
