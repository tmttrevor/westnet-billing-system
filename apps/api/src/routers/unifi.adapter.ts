import { Injectable } from '@nestjs/common';
import { RouterAdapter, RouterProvisionRequest } from './router.types';

@Injectable()
export class UnifiAdapter implements RouterAdapter {
  vendor:'UNIFI'='UNIFI';
  async provision(input:RouterProvisionRequest){
    // Production UniFi integration resolves controller credentials server-side.
    return {accepted:true,externalReference:`unifi:${input.subscriptionId}`};
  }
  async revoke(){ /* production revoke operation */ }
}
