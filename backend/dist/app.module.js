"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const prisma_service_1 = require("./services/prisma.service");
const user_1 = require("./controllers/user");
const event_emitter_1 = require("@nestjs/event-emitter");
const bcrypt_service_1 = require("./services/bcrypt.service");
const redis_service_1 = require("./services/redis.service");
const jwt_service_1 = require("./services/jwt.service");
const middlewares_1 = require("./middlewares");
const throttler_1 = require("@nestjs/throttler");
const logger_service_1 = require("./services/logger.service");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(middlewares_1.LogMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot(),
            user_1.UserModel,
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
        ],
        controllers: [user_1.UserController],
        providers: [
            app_service_1.AppService,
            prisma_service_1.PrismaService,
            user_1.UserService,
            bcrypt_service_1.BcryptService,
            redis_service_1.RedisService,
            jwt_service_1.JWTService,
            logger_service_1.LoggerService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map