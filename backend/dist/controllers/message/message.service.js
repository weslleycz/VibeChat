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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma.service");
const event_emitter_1 = require("@nestjs/event-emitter");
let MessageService = class MessageService {
    constructor(prismaService, eventEmmit) {
        this.prismaService = prismaService;
        this.eventEmmit = eventEmmit;
    }
    async getMessagesByChatId(chatId) {
        try {
            const chat = await this.prismaService.chat.findUnique({
                where: {
                    id: chatId,
                },
                select: {
                    id: true,
                    messages: {
                        orderBy: {
                            sentAt: 'asc',
                        },
                        include: {
                            user: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });
            return chat.messages;
        }
        catch (error) {
            throw new common_1.HttpException('O chat não foi encontrado', 400);
        }
    }
    async sendMessage({ chatId, content, userId }) {
        try {
            const message = await this.prismaService.message.create({
                data: {
                    content: content,
                    chatId: chatId,
                    userId: userId,
                },
            });
            const chat = await this.prismaService.chat.findUnique({
                where: {
                    id: message.chatId,
                },
                select: {
                    id: true,
                    messages: {
                        orderBy: {
                            sentAt: 'asc',
                        },
                        include: {
                            user: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                    contacts: true,
                },
            });
            const contacts = chat.contacts.find((contact) => {
                return contact.userContactId !== userId;
            });
            await this.eventEmmit.emit(chat.id);
            await this.eventEmmit.emit(contacts.userContactId);
            return chat.messages;
        }
        catch (error) {
            throw new common_1.HttpException('O chat não foi encontrado', 400);
        }
    }
    async getMessagesNotRead(chatId, userId) {
        try {
            const chat = await this.prismaService.message.findMany({
                where: {
                    chatId: chatId,
                    userId: userId,
                    read: false,
                },
            });
            const lastMessage = await this.prismaService.chat.findUnique({
                where: {
                    id: chatId,
                },
                select: {
                    messages: {
                        orderBy: {
                            sentAt: 'desc',
                        },
                    },
                },
            });
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    avatar: true,
                },
            });
            return {
                notRead: chat.length,
                lastMessage: lastMessage.messages[0].content,
                avatar: user.avatar,
            };
        }
        catch (error) {
            throw new common_1.HttpException('O chat não foi encontrado', 400);
        }
    }
    async messagesRead(chatId, userId) {
        try {
            const messages = await this.prismaService.message.updateMany({
                where: {
                    chatId: chatId,
                    userId: userId,
                },
                data: {
                    read: true,
                },
            });
            await this.eventEmmit.emit(userId);
        }
        catch (error) {
            throw new common_1.HttpException('O chat não foi encontrado', 400);
        }
    }
    async messageDelete(messageId, userId) {
        try {
            const messages = await this.prismaService.message.findUnique({
                where: {
                    id: messageId,
                },
            });
            if (messages != null) {
                if (messages.userId === userId) {
                    await this.prismaService.message.update({
                        where: {
                            id: messageId,
                        },
                        data: {
                            retracted: true,
                        },
                    });
                }
                else {
                    throw new common_1.HttpException('Operação não autorizada', 401);
                }
            }
            else {
                throw new common_1.HttpException('O chat não foi encontrado', 400);
            }
        }
        catch (error) {
            throw new common_1.HttpException('O chat não foi encontrado', 400);
        }
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], MessageService);
//# sourceMappingURL=message.service.js.map