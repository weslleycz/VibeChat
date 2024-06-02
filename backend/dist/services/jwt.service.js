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
exports.JWTService = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv = require("dotenv");
const redis_service_1 = require("./redis.service");
dotenv.config();
let JWTService = class JWTService {
    constructor(redisService) {
        this.redisService = redisService;
        this.secretKey = process.env.Security_JWT;
    }
    async login(id) {
        const payload = {
            data: id,
        };
        const token = (0, jsonwebtoken_1.sign)(payload, this.secretKey, { expiresIn: '72h' });
        await this.redisService.setValue(token, id, 259200);
        return { token: token };
    }
    verify(token) {
        try {
            (0, jsonwebtoken_1.verify)(token, this.secretKey);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    decodeJwt(token) {
        return (0, jsonwebtoken_1.decode)(token);
    }
    async logout(token) {
        await this.redisService.delValue(token);
    }
};
exports.JWTService = JWTService;
exports.JWTService = JWTService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], JWTService);
//# sourceMappingURL=jwt.service.js.map