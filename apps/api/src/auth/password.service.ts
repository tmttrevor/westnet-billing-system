import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(scryptCallback);

@Injectable()
export class PasswordService {
  async hash(password:string) {
    const salt=randomBytes(16).toString('hex');
    const derived=(await scrypt(password,salt,64)) as Buffer;
    return `${salt}:${derived.toString('hex')}`;
  }
  async verify(password:string, stored:string) {
    const [salt,hash]=stored.split(':');
    if(!salt||!hash) return false;
    const derived=(await scrypt(password,salt,64)) as Buffer;
    return timingSafeEqual(Buffer.from(hash,'hex'),derived);
  }
}
