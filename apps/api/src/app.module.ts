import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AuthController } from './auth/auth.controller';
import { PrismaAuthService } from './auth/prisma-auth.service';
import { PasswordService } from './auth/password.service';
import { JwtService } from './auth/jwt.service';
import { JwtGuard } from './auth/jwt.guard';
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
 imports:[PrismaModule],
 controllers:[HealthController,AuthController,PaymentController,CustomerController,PublicConfigController,PlanController,SubscriptionController],
 providers:[PrismaAuthService,PasswordService,JwtService,JwtGuard,PaymentService,PrismaCustomerService,BillingService,SubscriptionService,PublicConfigService,PrismaPlanService],
}) export class AppModule {}
