export declare class RedisService {
    private readonly redisClient;
    constructor();
    setValue(key: string, value: string, expiresInSeconds?: number): Promise<void>;
    getValue(key: string): Promise<string | null>;
    delValue(key: string): Promise<void>;
}
