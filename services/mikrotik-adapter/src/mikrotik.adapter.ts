import { RouterAdapter, RouterSession } from '../../../apps/api/src/routers/router.adapter';

export class MikroTikAdapter implements RouterAdapter {
  async connect(): Promise<void> { /* inject official connection client in deployment */ }
  async provisionAccess(input: RouterSession): Promise<void> { console.log('Provision MikroTik access', input.username); }
  async disconnect(username: string): Promise<void> { console.log('Disconnect MikroTik user', username); }
}
