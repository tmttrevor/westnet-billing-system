import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { JwtGuard } from '../auth/jwt.guard';
import { TenantGuard } from '../common/tenant/tenant.guard';
import { TenantId } from '../common/tenant/tenant.decorator';

@UseGuards(JwtGuard,TenantGuard)
@Controller('subscriptions')
export class SubscriptionController {
 constructor(private readonly subscriptions:SubscriptionService){}
 @Post('activate') activate(@TenantId() tenantId:string,@Body() body:{customerId:string;planId:string}) {return this.subscriptions.activate(tenantId,body.customerId,body.planId);}
}
