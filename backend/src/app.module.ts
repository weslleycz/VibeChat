import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
