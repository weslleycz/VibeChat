import { Message as MessagePrisma } from '@prisma/client';
export declare class MessageModel implements MessagePrisma {
    read: boolean;
    content: string;
    id: string;
    userId: string;
    sentAt: Date;
    chatId: string;
}
