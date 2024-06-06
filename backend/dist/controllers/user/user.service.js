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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma.service");
const bcrypt_service_1 = require("../../services/bcrypt.service");
const jwt_service_1 = require("../../services/jwt.service");
const uuidv4_1 = require("uuidv4");
const event_emitter_1 = require("@nestjs/event-emitter");
let UserService = class UserService {
    constructor(prismaService, bcryptService, jwtservice, eventEmmit) {
        this.prismaService = prismaService;
        this.bcryptService = bcryptService;
        this.jwtservice = jwtservice;
        this.eventEmmit = eventEmmit;
    }
    async create({ email, name, password }) {
        const existUser = await this.prismaService.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existUser === null) {
            const hashPassword = await this.bcryptService.hashPassword(password);
            const randomCode = (0, uuidv4_1.uuid)().substring(0, 5).toUpperCase();
            const user = await this.prismaService.user.create({
                data: {
                    email: email,
                    name: name,
                    password: hashPassword,
                    code: randomCode,
                },
            });
            return this.jwtservice.login(user.id);
        }
        else {
            throw new common_1.HttpException('Usuário já possui cadastro.', 409);
        }
    }
    async login({ email, password }) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });
        if (user === null) {
            throw new common_1.HttpException('Usuário ou senha inválidos', 401);
        }
        else {
            if (await this.bcryptService.comparePasswords(password, user.password)) {
                return this.jwtservice.login(user.id);
            }
            else {
                throw new common_1.HttpException('Usuário ou senha inválidos', 401);
            }
        }
    }
    async getContacts(id) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    id,
                },
                select: {
                    Contact: {
                        select: {
                            userContactId: true,
                            chatId: true,
                        },
                    },
                },
            });
            if (!user) {
                throw new common_1.HttpException('Usuário não encontrado', 404);
            }
            const contactIds = user.Contact.map((contact) => contact.userContactId);
            const contacts = await this.prismaService.user.findMany({
                where: {
                    id: {
                        in: contactIds,
                    },
                },
            });
            const contactsWithChatId = contacts.map((contact) => {
                const contactData = user.Contact.find((c) => c.userContactId === contact.id);
                return {
                    ...contact,
                    chatId: contactData?.chatId,
                };
            });
            return contactsWithChatId;
        }
        catch (error) {
            throw new common_1.HttpException('Usuário inválido', 400);
        }
    }
    async addContact({ codeContact, userId }) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        });
        try {
            if (user.code != codeContact) {
                const friend = await this.prismaService.user.findUnique({
                    where: {
                        code: codeContact,
                    },
                });
                await this.prismaService.chat.create({
                    data: {
                        contacts: {
                            createMany: {
                                data: [
                                    {
                                        userId: user.id,
                                        userContactId: friend.id,
                                    },
                                    {
                                        userId: friend.id,
                                        userContactId: user.id,
                                    },
                                ],
                            },
                        },
                    },
                });
                const userUpdate = await this.prismaService.user.findUnique({
                    where: {
                        id: userId,
                    },
                    select: {
                        Contact: {
                            select: {
                                userContactId: true,
                                chatId: true,
                            },
                        },
                    },
                });
                const contactIds = userUpdate.Contact.map((contact) => contact.userContactId);
                const contacts = await this.prismaService.user.findMany({
                    where: {
                        id: {
                            in: contactIds,
                        },
                    },
                });
                const contactsWithChatId = contacts.map(async (contact) => {
                    const contactData = userUpdate.Contact.find((c) => c.userContactId === contact.id);
                    return {
                        ...contact,
                        chatId: contactData?.chatId,
                    };
                });
                await this.eventEmmit.emit(userId);
                return contactsWithChatId;
            }
            else {
                throw new common_1.HttpException('Usuário inválido', 400);
            }
        }
        catch (error) {
            throw new common_1.HttpException('Usuário inválido', 400);
        }
    }
    async removeContact({ contactId, userId }) {
        try {
        }
        catch (error) {
            throw new common_1.HttpException('Usuário inválido', 400);
        }
    }
    async getUser(id) {
        try {
            return await this.prismaService.user.findUnique({
                where: {
                    id,
                },
                select: {
                    name: true,
                    code: true,
                    email: true,
                    avatar: true,
                },
            });
        }
        catch (error) {
            throw new common_1.HttpException('Usuário inválido', 400);
        }
    }
    async uploadAvatar({ avatar, userId }) {
        try {
            await this.prismaService.user.update({
                where: {
                    id: userId,
                },
                data: {
                    avatar: avatar,
                },
            });
        }
        catch (error) {
            throw new common_1.HttpException('Usuário inválido', 400);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bcrypt_service_1.BcryptService,
        jwt_service_1.JWTService,
        event_emitter_1.EventEmitter2])
], UserService);
//# sourceMappingURL=user.service.js.map