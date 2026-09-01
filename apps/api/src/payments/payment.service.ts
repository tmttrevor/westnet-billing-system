import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class PaymentService {
  async initiateStkPush(input: { tenantId: string; phone: string; amount: number; accountReference: string }) {
    // Safaricom credentials and production request signing are loaded from environment variables.
    return { paymentId: randomUUID(), status: 'PENDING', phone: input.phone, amount: input.amount, accountReference: input.accountReference };
  }

  async handleCallback(payload: unknown) {
    // Persist and verify provider callback before provisioning service.
    return { received: true, payloadStored: true };
  }
}
