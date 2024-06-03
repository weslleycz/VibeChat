import { Injectable } from '@nestjs/common';
import { sign, verify, decode, Secret } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { RedisService } from './redis.service';

dotenv.config();

@Injectable()
export class JWTService {
  private secretKey: Secret;

  constructor(private readonly redisService: RedisService) {
    this.secretKey = process.env.Security_JWT;
  }

  public async login(id: string): Promise<object> {
    const payload = {
      data: id,
    };
    const token = sign(payload, this.secretKey, { expiresIn: '72h' });
    await this.redisService.setValue(token, id, 259200);
    return { token };
  }

  public verify(token: string): boolean {
    try {
      verify(token, this.secretKey);
      return true;
    } catch (err) {
      return false;
    }
  }

  public decodeJwt(token: string) {
    return decode(token);
  }

  public async logout(token: string) {
    await this.redisService.delValue(token);
  }
}
