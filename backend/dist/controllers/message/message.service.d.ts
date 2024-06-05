import { PrismaService } from 'src/services/prisma.service';
import { MessageDTO } from './message.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class MessageService {
    private readonly prismaService;
    private readonly eventEmmit;
    constructor(prismaService: PrismaService, eventEmmit: EventEmitter2);
    getMessagesByChatId(chatId: string): Promise<({
        user: {
            name: string;
        };
    } & {
        id: string;
        userId: string;
        sentAt: Date;
        chatId: string;
        content: string;
        read: boolean;
    })[]>;
    sendMessage({ chatId, content, userId }: MessageDTO): Promise<({
        user: {
            name: string;
        };
    } & {
        id: string;
        userId: string;
        sentAt: Date;
        chatId: string;
        content: string;
        read: boolean;
    })[]>;
    getMessagesNotRead(chatId: string, userId: string): Promise<{
        notRead: number;
        lastMessage: string;
    }>;
}
