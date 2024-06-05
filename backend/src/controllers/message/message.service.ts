import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { MessageDTO } from './message.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MessageService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmmit: EventEmitter2,
  ) {}
  async getMessagesByChatId(chatId: string) {
    try {
      const chat = await this.prismaService.chat.findUnique({
        where: {
          id: chatId,
        },
        select: {
          id: true,
          messages: {
            orderBy: {
              sentAt: 'asc',
            },
            include: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      return chat.messages;
    } catch (error) {
      throw new HttpException('O chat não foi encontrado', 400);
    }
  }

  async sendMessage({ chatId, content, userId }: MessageDTO) {
    try {
      const message = await this.prismaService.message.create({
        data: {
          content: content,
          chatId: chatId,
          userId: userId,
        },
      });
      const chat = await this.prismaService.chat.findUnique({
        where: {
          id: message.chatId,
        },
        select: {
          id: true,
          messages: {
            orderBy: {
              sentAt: 'asc',
            },
            include: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      await this.eventEmmit.emit(chat.id);
      return chat.messages;
    } catch (error) {
      throw new HttpException('O chat não foi encontrado', 400);
    }
  }

  async getMessagesNotRead(chatId: string, userId: string) {
    try {
      const chat = await this.prismaService.message.findMany({
        where: {
          chatId: chatId,
          userId: userId,
          read: false,
        },
      });
      const lastMessage = await this.prismaService.chat.findUnique({
        where: {
          id: chatId,
        },
        select: {
          messages: {
            orderBy: {
              sentAt: 'desc',
            },
          },
        },
      });
      return {
        notRead: chat.length,
        lastMessage: lastMessage.messages[0].content,
      };
    } catch (error) {
      throw new HttpException('O chat não foi encontrado', 400);
    }
  }
}
