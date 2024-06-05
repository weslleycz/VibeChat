import { MiddlewareConsumer, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppService } from './app.service';
import { MessageController } from './controllers/message/message.controller';
import { MessageService } from './controllers/message/message.service';
import { UserController, UserModel, UserService } from './controllers/user';
import { LogMiddleware } from './middlewares';
import { BcryptService } from './services/bcrypt.service';
import { JWTService } from './services/jwt.service';
import { LoggerService } from './services/logger.service';
import { PrismaService } from './services/prisma.service';
import { RedisService } from './services/redis.service';
import { ChatGateway } from './websocket/chat/chat.gateway';
import { NotificationGateway } from './websocket/notification/notification.gateway';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    UserModel,
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 60000,
    //     limit: 100,
    //   },
    // ]),
  ],
  controllers: [UserController, MessageController],
  providers: [
    AppService,
    PrismaService,
    UserService,
    BcryptService,
    RedisService,
    JWTService,
    LoggerService,
    ChatGateway,
    MessageService,
    NotificationGateway,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
