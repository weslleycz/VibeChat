import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { NotificationGatewayDTO } from './notification.gateway.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Server } from 'socket.io';

@WebSocketGateway()
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @WebSocketServer() server: Server;

  handleDisconnect(client: any) {}
  handleConnection(client: any, ...args: any[]) {}

  @SubscribeMessage('notification')
  handleMessage(client: any, payload: NotificationGatewayDTO) {
    this.eventEmitter.on(payload.userId, () => {
      console.log(payload.userId);
      this.server.emit(payload.userId, {
        message: 'Update',
      });
    });
  }
}
