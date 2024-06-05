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
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const notification_gateway_dto_1 = require("./notification.gateway.dto");
const event_emitter_1 = require("@nestjs/event-emitter");
const socket_io_1 = require("socket.io");
let NotificationGateway = class NotificationGateway {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    handleDisconnect(client) { }
    handleConnection(client, ...args) { }
    handleMessage(client, payload) {
        this.eventEmitter.on(payload.userId, () => {
            console.log(payload.userId);
            this.server.emit(payload.userId, {
                message: 'Update',
            });
        });
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('notification'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, notification_gateway_dto_1.NotificationGatewayDTO]),
    __metadata("design:returntype", void 0)
], NotificationGateway.prototype, "handleMessage", null);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map