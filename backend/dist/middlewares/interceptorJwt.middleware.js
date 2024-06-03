"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterceptorJwt = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../services/redis.service");
let InterceptorJwt = class InterceptorJwt {
    constructor(redisService) {
        this.redisService = redisService;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const headers = request.headers;
        const authorizationHeader = headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            throw new common_1.HttpException('Token não fornecido', common_1.HttpStatus.UNAUTHORIZED);
        }
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw new common_1.HttpException('Token não fornecido', common_1.HttpStatus.UNAUTHORIZED);
        }
        const tokenValue = await this.redisService.getValue(token);
        if (!tokenValue) {
            throw new common_1.HttpException('Sessão expirada', common_1.HttpStatus.UNAUTHORIZED);
        }
        request.body.token = tokenValue;
        return next.handle();
    }
};
exports.InterceptorJwt = InterceptorJwt;
exports.InterceptorJwt = InterceptorJwt = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], InterceptorJwt);
//# sourceMappingURL=interceptorJwt.middleware.js.map