import { Body, Controller, Post } from '@nestjs/common';
import { TenantOnboardingService } from './tenant-onboarding.service';
@Controller('tenants')
export class TenantOnboardingController {
 constructor(private readonly onboarding:TenantOnboardingService){}
 @Post('onboard') onboard(@Body() body:{name:string;email:string;password:string}){return this.onboarding.onboard(body);}
}
