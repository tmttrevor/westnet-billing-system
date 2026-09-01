import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PaymentService } from './payments/payment.service';
import { PaymentController } from './payments/payment.controller';
import { CustomerController } from './customers/customer.controller';
import { PrismaCustomerService } from './customers/prisma-customer.service';
import { BillingService } from './billing/billing.service';
import { SubscriptionService } from './billing/subscription.service';
import { SubscriptionController } from './billing/subscription.controller';
import { PublicConfigService } from './config/public-config.service';
import { PublicConfigController } from './config/public-config.controller';
import { PlanController } from './plans/plan.controller';
import { PrismaPlanService } from './plans/prisma-plan.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HealthController, AuthController, PaymentController, CustomerController, PublicConfigController, PlanController, SubscriptionController],
  providers: [AuthService, PaymentService, PrismaCustomerService, BillingService, SubscriptionService, PublicConfigService, PrismaPlanService],
})
export class AppModule {}
