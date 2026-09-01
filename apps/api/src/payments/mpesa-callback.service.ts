import { BadRequestException, Injectable } from '@nestjs/common';
import { parseMpesaCallback } from './mpesa-callback.parser';
import { PaymentLedgerService } from './payment-ledger.service';

@Injectable()
export class MpesaCallbackService {
  constructor(private readonly ledger: PaymentLedgerService) {}

  async handle(payload: unknown) {
    const callback = parseMpesaCallback(payload as any);
    if (callback.resultCode !== 0) return { received: true, successful: false, callback };
    if (!callback.receipt || !callback.checkoutRequestId) throw new BadRequestException('Incomplete successful M-PESA callback');
    return { received: true, successful: true, callback };
  }
}
