import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatGatewayDTO } from './chat.gateway.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly eventEmitter;
    server: Server;
    constructor(eventEmitter: EventEmitter2);
    handleDisconnect(client: any): void;
    handleConnection(client: any, ...args: any[]): Promise<void>;
    handleMessage(client: any, payload: ChatGatewayDTO): Promise<void>;
}
