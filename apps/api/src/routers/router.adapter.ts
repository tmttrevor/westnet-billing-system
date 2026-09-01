export type RouterSession = { username: string; expiresAt: Date };

export interface RouterAdapter {
  connect(): Promise<void>;
  provisionAccess(input: RouterSession): Promise<void>;
  disconnect(username: string): Promise<void>;
}
