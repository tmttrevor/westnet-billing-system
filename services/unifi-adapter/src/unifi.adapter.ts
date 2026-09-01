import { RouterAdapter, RouterSession } from '../../../apps/api/src/routers/router.adapter';

export class UnifiAdapter implements RouterAdapter {
  async connect(): Promise<void> { /* configure controller credentials through environment variables */ }
  async provisionAccess(input: RouterSession): Promise<void> { console.log('Provision UniFi access', input.username); }
  async disconnect(username: string): Promise<void> { console.log('Disconnect UniFi client', username); }
}
