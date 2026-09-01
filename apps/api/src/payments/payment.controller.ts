import { Body, Controller, Post } from '@nestjs/common';
import { MpesaService } from './mpesa.service';
import { parseMpesaCallback } from './mpesa-callback.parser';

@Controller('payments')
export class PaymentController {
  constructor(private readonly mpesa: MpesaService) {}

  @Post('mpesa/stk-push')
  stkPush(@Body() body: { phone: string; amount: number; accountReference: string; transactionDesc?: string }) {
    return this.mpesa.stkPush(body);
  }

  @Post('mpesa/callback')
  callback(@Body() body: unknown) {
    const callback=parseMpesaCallback(body);
    return { received:true, resultCode:callback.resultCode };
  }
}
