import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

export type Plan = { id:string; tenantId:string; name:string; price:number; durationMinutes:number; active:boolean };
@Injectable()
export class PlanService {
  private plans = new Map<string, Plan>();
  create(input: Omit<Plan,'id'>) { const plan={...input,id:randomUUID()}; this.plans.set(plan.id,plan); return plan; }
  list(tenantId:string) { return [...this.plans.values()].filter(p=>p.tenantId===tenantId); }
  get(tenantId:string,id:string) { const plan=this.plans.get(id); if(!plan||plan.tenantId!==tenantId) throw new NotFoundException('Plan not found'); return plan; }
}
