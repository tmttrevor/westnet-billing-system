import { BadRequestException, Injectable } from '@nestjs/common';

export type PaymentState = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

@Injectable()
export class PaymentStateService {
  transition(current: PaymentState, next: PaymentState): PaymentState {
    const allowed: Record<PaymentState, PaymentState[]> = {
      PENDING: ['SUCCESS', 'FAILED', 'CANCELLED'],
      SUCCESS: [], FAILED: [], CANCELLED: [],
    };
    if (!allowed[current].includes(next)) throw new BadRequestException(`Invalid payment transition: ${current} -> ${next}`);
    return next;
  }
}
