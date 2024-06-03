import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { UserController, UserService, UserModel } from './controllers/user';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BcryptService } from './services/bcrypt.service';
import { RedisService } from './services/redis.service';
import { JWTService } from './services/jwt.service';
import { LogMiddleware } from './middlewares';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerService } from './services/logger.service';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    UserModel,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    AppService,
    PrismaService,
    UserService,
    BcryptService,
    RedisService,
    JWTService,
    LoggerService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
