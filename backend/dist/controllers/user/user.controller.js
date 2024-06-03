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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("./user.dto");
const user_service_1 = require("./user.service");
const middlewares_1 = require("../../middlewares");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(data) {
        return this.userService.create(data);
    }
    async login(data) {
        return this.userService.login(data);
    }
    async getContacts(id) {
        return await this.userService.getContacts(id);
    }
    async addContact(data) {
        return await this.userService.addContact(data);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar um novo usuário' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuário criado com sucesso.',
        type: user_dto_1.UserLoginResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Usuário já possui cadastro.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Usuário já possui cadastro.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiOperation)({ summary: 'Realizar login do usuário' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login realizado com sucesso.',
        type: user_dto_1.UserLoginResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Usuário ou senha inválidos.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/getContacts/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca a lista de contatos do usuário' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de contatos do usuário.',
        type: user_dto_1.UserListContacts,
        isArray: true,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Usuário inválido.' }),
    (0, common_1.UseInterceptors)(middlewares_1.InterceptorJwt),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getContacts", null);
__decorate([
    (0, common_1.Put)('/addContact'),
    (0, swagger_1.ApiOperation)({ summary: 'Adicionar contato' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Usuário inválido.' }),
    (0, common_1.UseInterceptors)(middlewares_1.InterceptorJwt),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.AddContactDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addContact", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('User'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map