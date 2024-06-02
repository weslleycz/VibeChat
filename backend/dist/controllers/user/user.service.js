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
let UserService = class UserService {
    constructor(prismaService, bcryptService, jwtservice) {
        this.prismaService = prismaService;
        this.bcryptService = bcryptService;
        this.jwtservice = jwtservice;
    }
    async create({ email, name, password }) {
        const existUser = await this.prismaService.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existUser === null) {
            const hashPassword = await this.bcryptService.hashPassword(password);
            const user = await this.prismaService.user.create({
                data: {
                    email: email,
                    name: name,
                    password: hashPassword,
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bcrypt_service_1.BcryptService,
        jwt_service_1.JWTService])
], UserService);
//# sourceMappingURL=user.service.js.map