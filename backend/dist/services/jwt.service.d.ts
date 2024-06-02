import { RedisService } from './redis.service';
export declare class JWTService {
    private readonly redisService;
    private secretKey;
    constructor(redisService: RedisService);
    login(id: string): Promise<object>;
    verify(token: string): boolean;
    decodeJwt(token: string): any;
    logout(token: string): Promise<void>;
}
