import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { RedisService } from 'src/services/redis.service';

@Injectable()
export class InterceptorJwt implements NestInterceptor {
  constructor(private readonly redisService: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest() as Request;
    const headers = request.headers;
    const authorizationHeader = headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new HttpException('Token não fornecido', HttpStatus.UNAUTHORIZED);
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new HttpException('Token não fornecido', HttpStatus.UNAUTHORIZED);
    }
    const tokenValue = await this.redisService.getValue(token);
    if (!tokenValue) {
      throw new HttpException('Sessão expirada', HttpStatus.UNAUTHORIZED);
    }
    request.body.token = tokenValue;
    return next.handle();
  }
}
