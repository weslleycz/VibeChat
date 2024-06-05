import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { NotificationGatewayDTO } from './notification.gateway.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Server } from 'socket.io';
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    server: Server;
    handleDisconnect(client: any): void;
    handleConnection(client: any, ...args: any[]): void;
    handleMessage(client: any, payload: NotificationGatewayDTO): void;
}
