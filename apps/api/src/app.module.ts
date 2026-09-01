import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AuthController } from './auth/auth.controller';
import { PrismaAuthService } from './auth/prisma-auth.service';
import { PasswordService } from './auth/password.service';
import { JwtService } from './auth/jwt.service';
import { JwtGuard } from './auth/jwt.guard';
import { MpesaService } from './payments/mpesa.service';
import { MpesaCallbackService } from './payments/mpesa-callback.service';
import { PaymentController } from './payments/payment.controller';
import { PaymentStateService } from './payments/payment-state.service';
import { PaymentLedgerService } from './payments/payment-ledger.service';
import { PaymentWebhookService } from './payments/payment-webhook.service';
import { CustomerController } from './customers/customer.controller';
import { PrismaCustomerService } from './customers/prisma-customer.service';
import { SubscriptionService } from './billing/subscription.service';
import { SubscriptionController } from './billing/subscription.controller';
import { ProvisioningService } from './billing/provisioning.service';
import { PublicConfigService } from './config/public-config.service';
import { PublicConfigController } from './config/public-config.controller';
import { PlanController } from './plans/plan.controller';
import { PrismaPlanService } from './plans/prisma-plan.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
 imports:[PrismaModule],
 controllers:[HealthController,AuthController,PaymentController,CustomerController,PublicConfigController,PlanController,SubscriptionController],
 providers:[PrismaAuthService,PasswordService,JwtService,JwtGuard,MpesaService,MpesaCallbackService,PaymentStateService,PaymentLedgerService,PaymentWebhookService,PrismaCustomerService,SubscriptionService,ProvisioningService,PublicConfigService,PrismaPlanService],
}) export class AppModule {}
