import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  health() {
    return { service: 'westnet-billing-api', status: 'ok', timestamp: new Date().toISOString() };
  }
}
