import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../services/logger.service';
export declare class LogMiddleware implements NestMiddleware {
    private readonly loggerService;
    constructor(loggerService: LoggerService);
    use(req: Request, res: Response, next: NextFunction): void;
}
