import { Injectable } from '@nestjs/common';
import { RouterAdapter, RouterProvisionRequest } from './router.types';

@Injectable()
export class MikrotikAdapter implements RouterAdapter {
  vendor:'MIKROTIK'='MIKROTIK';
  async provision(input:RouterProvisionRequest){
    // Production RouterOS API calls belong behind server-side router configuration.
    return {accepted:true,externalReference:`mikrotik:${input.subscriptionId}`};
  }
  async revoke(){ /* production revoke operation */ }
}
