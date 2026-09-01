import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

export type Customer = { id:string; tenantId:string; name:string; phone:string; email?:string; createdAt:Date };
@Injectable()
export class CustomerService {
  private readonly customers = new Map<string, Customer>();
  create(input: Omit<Customer,'id'|'createdAt'>) { const c={...input,id:randomUUID(),createdAt:new Date()}; this.customers.set(c.id,c); return c; }
  list(tenantId:string) { return [...this.customers.values()].filter(c=>c.tenantId===tenantId); }
  get(tenantId:string,id:string) { const c=this.customers.get(id); if(!c||c.tenantId!==tenantId) throw new NotFoundException('Customer not found'); return c; }
}
