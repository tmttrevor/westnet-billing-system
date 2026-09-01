import { Body, Controller, Headers, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptions: SubscriptionService) {}
  @Post('activate')
  activate(@Headers('x-tenant-id') tenantId:string,@Body() body:{customerId:string;planId:string}) {
    return this.subscriptions.activate(tenantId,body.customerId,body.planId);
  }
}
