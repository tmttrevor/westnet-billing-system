export type RouterVendor='MIKROTIK'|'UNIFI';
export type RouterProvisionRequest={tenantId:string;routerId:string;customerId:string;subscriptionId:string;planId:string;};
export interface RouterAdapter{vendor:RouterVendor;provision(input:RouterProvisionRequest):Promise<{accepted:boolean;externalReference?:string}>;revoke(input:Pick<RouterProvisionRequest,'tenantId'|'routerId'|'customerId'|'subscriptionId'>):Promise<void>;}
