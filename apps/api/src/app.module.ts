import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PaymentService } from './payments/payment.service';
import { PaymentController } from './payments/payment.controller';
import { CustomerService } from './customers/customer.service';
import { CustomerController } from './customers/customer.controller';
import { BillingService } from './billing/billing.service';

@Module({
  controllers: [HealthController, AuthController, PaymentController, CustomerController],
  providers: [AuthService, PaymentService, CustomerService, BillingService],
})
export class AppModule {}
