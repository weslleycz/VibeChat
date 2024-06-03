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
exports.LogMiddleware = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../services/logger.service");
let LogMiddleware = class LogMiddleware {
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    use(req, res, next) {
        this.loggerService.log(`Request ${req.method} ${req.originalUrl}`);
        next();
    }
};
exports.LogMiddleware = LogMiddleware;
exports.LogMiddleware = LogMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], LogMiddleware);
//# sourceMappingURL=log.middleware.js.map