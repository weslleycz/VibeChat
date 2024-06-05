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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const middlewares_1 = require("../../middlewares");
const message_dto_1 = require("./message.dto");
const message_model_1 = require("./message.model");
const message_service_1 = require("./message.service");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async getMessagesByChatId(chatId) {
        return await this.messageService.getMessagesByChatId(chatId);
    }
    async sendMessage(data) {
        return await this.messageService.sendMessage(data);
    }
    async getMessagesNotRead(chatId, userId) {
        return await this.messageService.getMessagesNotRead(chatId, userId);
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Get)('/:chatId'),
    (0, common_1.UseInterceptors)(middlewares_1.InterceptorJwt),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Busca as mensagens por chat' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista das mensagens.',
        type: message_model_1.MessageModel,
        isArray: true,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'O chat não foi encontrado.' }),
    __param(0, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessagesByChatId", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(middlewares_1.InterceptorJwt),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar nova mensagem' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista das mensagens.',
        type: message_model_1.MessageModel,
        isArray: true,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'O chat não foi encontrado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.MessageDTO]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('/getMessagesNotRead/:chatId/:userId'),
    (0, common_1.UseInterceptors)(middlewares_1.InterceptorJwt),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '' }),
    __param(0, (0, common_1.Param)('chatId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessagesNotRead", null);
exports.MessageController = MessageController = __decorate([
    (0, swagger_1.ApiTags)('Message'),
    (0, common_1.Controller)('message'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
//# sourceMappingURL=message.controller.js.map