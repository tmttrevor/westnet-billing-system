import { Injectable } from '@nestjs/common';

export type Plan={id:string;tenantId:string;name:string;price:number;durationMinutes:number};
export type Subscription={id:string;customerId:string;planId:string;startsAt:Date;expiresAt:Date;status:'ACTIVE'|'EXPIRED'|'SUSPENDED'};
@Injectable()
export class BillingService {
 activate(customerId:string,plan:Plan):Subscription { const startsAt=new Date(); return {id:crypto.randomUUID(),customerId,planId:plan.id,startsAt,expiresAt:new Date(startsAt.getTime()+plan.durationMinutes*60000),status:'ACTIVE'}; }
 isExpired(subscription:Subscription){return subscription.expiresAt.getTime()<=Date.now();}
}
