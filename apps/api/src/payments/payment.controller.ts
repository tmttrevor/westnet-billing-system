import { Body, Controller, Post } from '@nestjs/common';
import { MpesaService } from './mpesa.service';
import { MpesaCallbackService } from './mpesa-callback.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly mpesa: MpesaService, private readonly callbacks: MpesaCallbackService) {}

  @Post('mpesa/stk-push')
  stkPush(@Body() body: { phone: string; amount: number; accountReference: string; transactionDesc?: string }) {
    return this.mpesa.stkPush(body);
  }

  @Post('mpesa/callback')
  callback(@Body() body: unknown) {
    return this.callbacks.handle(body);
  }
}
