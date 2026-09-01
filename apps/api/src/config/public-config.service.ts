import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicConfigService {
  readonly helpline = process.env.HELPLINE_PHONE || '0715310622';

  getPublicConfig() {
    return { productName: 'WestNet Billing System', helpline: this.helpline };
  }
}
