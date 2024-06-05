import { MessageDTO } from './message.dto';
import { MessageModel } from './message.model';
import { MessageService } from './message.service';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    getMessagesByChatId(chatId: string): Promise<MessageModel[]>;
    sendMessage(data: MessageDTO): Promise<({
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
    messagesRead(chatId: string, userId: string): Promise<void>;
    getMessagesNotRead(chatId: string, userId: string): Promise<{
        notRead: number;
        lastMessage: string;
    }>;
}
