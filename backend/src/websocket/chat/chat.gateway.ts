import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatGatewayDTO } from './chat.gateway.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(private readonly eventEmitter: EventEmitter2) {}
  handleDisconnect(client: any) {}
  async handleConnection(client: any, ...args: any[]) {}

  @SubscribeMessage('chat')
  async handleMessage(client: any, payload: ChatGatewayDTO) {
    this.eventEmitter.on(payload.chatId, () => {
      this.server.emit(payload.chatId, {
        message: 'Update',
      });
    });
  }
}
