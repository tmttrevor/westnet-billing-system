import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AuditLogService {
  constructor(private readonly prisma: PrismaService) {}
  async record(input:{tenantId:string;actorUserId?:string;action:string;entity:string;entityId?:string;metadata?:unknown}) {
    return this.prisma.auditLog.create({data:{tenantId:input.tenantId,actorUserId:input.actorUserId,action:input.action,entity:input.entity,entityId:input.entityId,metadata:input.metadata as any}});
  }
}
