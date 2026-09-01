import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MpesaCallbackService } from './mpesa-callback.service';
import { PaymentOrchestratorService } from './payment-orchestrator.service';
import { JwtGuard } from '../auth/jwt.guard';
import { TenantGuard } from '../common/tenant/tenant.guard';
import { TenantId } from '../common/tenant/tenant.decorator';

@Controller('payments')
export class PaymentController {
  constructor(private readonly callbacks: MpesaCallbackService, private readonly payments: PaymentOrchestratorService) {}

  @UseGuards(JwtGuard,TenantGuard)
  @Post('mpesa/stk-push')
  stkPush(@TenantId() tenantId:string,@Body() body:{customerId:string;planId:string;phone:string}) {
    return this.payments.startStkPush({tenantId,...body});
  }

  @Post('mpesa/callback')
  callback(@Body() body: unknown) { return this.callbacks.handle(body); }
}
