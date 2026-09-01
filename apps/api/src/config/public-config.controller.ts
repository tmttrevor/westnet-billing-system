import { Controller, Get } from '@nestjs/common';
import { PublicConfigService } from './public-config.service';

@Controller('public')
export class PublicConfigController {
  constructor(private readonly config: PublicConfigService) {}

  @Get('config')
  getConfig() {
    return this.config.getPublicConfig();
  }
}
