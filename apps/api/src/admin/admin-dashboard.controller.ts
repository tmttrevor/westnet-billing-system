import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard.service';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { TenantGuard } from '../common/tenant/tenant.guard';
import { TenantId } from '../common/tenant/tenant.decorator';
@Controller('admin/dashboard')
@UseGuards(JwtGuard,TenantGuard,RolesGuard)
export class AdminDashboardController {
 constructor(private readonly dashboard:AdminDashboardService){}
 @Get('summary') @Roles('SUPER_ADMIN','TENANT_ADMIN') summary(@TenantId() tenantId:string){return this.dashboard.summary(tenantId);}
}
