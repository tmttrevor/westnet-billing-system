import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac, randomUUID } from 'crypto';

export type SessionUser = { id: string; email: string; tenantId?: string; role: 'SUPER_ADMIN' | 'ISP_ADMIN' | 'STAFF' };

@Injectable()
export class AuthService {
  private users = new Map<string, { id: string; email: string; passwordHash: string; tenantId?: string; role: SessionUser['role'] }>();

  async register(email: string, password: string, tenantId?: string): Promise<SessionUser> {
    if (this.users.has(email)) throw new UnauthorizedException('Account already exists');
    const user = { id: randomUUID(), email: email.toLowerCase(), passwordHash: this.hash(password), tenantId, role: 'ISP_ADMIN' as const };
    this.users.set(user.email, user);
    return this.safe(user);
  }

  async login(email: string, password: string) {
    const user = this.users.get(email.toLowerCase());
    if (!user || user.passwordHash !== this.hash(password)) throw new UnauthorizedException('Invalid credentials');
    return { accessToken: this.token(this.safe(user)), user: this.safe(user) };
  }

  private safe(user: any): SessionUser { return { id: user.id, email: user.email, tenantId: user.tenantId, role: user.role }; }
  private hash(value: string) { return createHmac('sha256', process.env.JWT_SECRET || 'development-secret').update(value).digest('hex'); }
  private token(user: SessionUser) { return Buffer.from(JSON.stringify({ ...user, exp: Date.now() + 86400000 })).toString('base64url'); }
}
