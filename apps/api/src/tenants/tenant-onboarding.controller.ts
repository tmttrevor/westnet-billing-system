import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TenantOnboardingService } from './tenant-onboarding.service';
import { OnboardingGuard } from '../auth/onboarding.guard';
@Controller('tenants')
export class TenantOnboardingController {
 constructor(private readonly onboarding:TenantOnboardingService){}
 @UseGuards(OnboardingGuard)
 @Post('onboard') onboard(@Body() body:{name:string;email:string;password:string}){return this.onboarding.onboard(body);}
}
