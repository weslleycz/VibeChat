import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { UserController, UserService, UserModel } from './controllers/user';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BcryptService } from './services/bcrypt.service';
import { RedisService } from './services/redis.service';
import { JWTService } from './services/jwt.service';

@Module({
  imports: [EventEmitterModule.forRoot(), UserModel],
  controllers: [UserController],
  providers: [
    AppService,
    PrismaService,
    UserService,
    BcryptService,
    RedisService,
    JWTService,
  ],
})
export class AppModule {}
