import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PaymentService } from './payments/payment.service';
import { PaymentController } from './payments/payment.controller';
import { CustomerService } from './customers/customer.service';
import { CustomerController } from './customers/customer.controller';
import { BillingService } from './billing/billing.service';
import { PublicConfigService } from './config/public-config.service';
import { PublicConfigController } from './config/public-config.controller';
import { PlanService } from './plans/plan.service';
import { PlanController } from './plans/plan.controller';

@Module({
  controllers: [HealthController, AuthController, PaymentController, CustomerController, PublicConfigController, PlanController],
  providers: [AuthService, PaymentService, CustomerService, BillingService, PublicConfigService, PlanService],
})
export class AppModule {}
