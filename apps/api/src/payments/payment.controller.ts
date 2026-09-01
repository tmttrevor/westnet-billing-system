import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly payments: PaymentService) {}

  @Post('mpesa/stk-push')
  stkPush(@Body() body: { tenantId: string; phone: string; amount: number; accountReference: string }) {
    return this.payments.initiateStkPush(body);
  }

  @Post('mpesa/callback')
  callback(@Body() body: unknown) { return this.payments.handleCallback(body); }
}
