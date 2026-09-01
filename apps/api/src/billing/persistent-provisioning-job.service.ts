import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

export type ProvisioningJobStatus='QUEUED'|'RUNNING'|'SUCCESS'|'FAILED';

@Injectable()
export class PersistentProvisioningJobService {
  constructor(private readonly prisma:PrismaService) {}
  async enqueue(input:{tenantId:string;customerId:string;subscriptionId:string;routerId:string}) {
    return this.prisma.provisioningJob.create({data:{id:randomUUID(),...input,status:'QUEUED',attempts:0,nextRunAt:new Date()}});
  }
  async claim(id:string) {
    const result=await this.prisma.provisioningJob.updateMany({where:{id,status:'QUEUED',nextRunAt:{lte:new Date()}},data:{status:'RUNNING',attempts:{increment:1},startedAt:new Date()}});
    if(!result.count) throw new NotFoundException('Provisioning job unavailable');
    return this.prisma.provisioningJob.findUniqueOrThrow({where:{id}});
  }
  async complete(id:string){return this.prisma.provisioningJob.update({where:{id},data:{status:'SUCCESS',completedAt:new Date(),lastError:null}});}
  async fail(id:string,error:unknown,maxAttempts=5){
    const job=await this.prisma.provisioningJob.findUniqueOrThrow({where:{id}});
    const message=error instanceof Error?error.message:String(error);
    if(job.attempts>=maxAttempts) return this.prisma.provisioningJob.update({where:{id},data:{status:'FAILED',lastError:message,completedAt:new Date()}});
    const delayMs=Math.min(30*60_000,Math.pow(2,job.attempts)*30_000);
    return this.prisma.provisioningJob.update({where:{id},data:{status:'QUEUED',lastError:message,nextRunAt:new Date(Date.now()+delayMs)}});
  }
}
