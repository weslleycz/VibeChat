import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RedisService } from 'src/services/redis.service';
export declare class InterceptorJwt implements NestInterceptor {
    private readonly redisService;
    constructor(redisService: RedisService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
