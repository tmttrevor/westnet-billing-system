import { Injectable, NotFoundException } from '@nestjs/common';
export type RouterAdapter={type:string;provision(input:any):Promise<void>;revoke?(input:any):Promise<void>};
@Injectable()
export class RouterAdapterRegistry {
  constructor(private readonly adapters:RouterAdapter[]){}
  get(type:string){const adapter=this.adapters.find(a=>a.type===type);if(!adapter) throw new NotFoundException(`Unsupported router type: ${type}`);return adapter;}
}
