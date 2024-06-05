import { ApiProperty } from '@nestjs/swagger';
import { Message as MessagePrisma } from '@prisma/client';

export class MessageModel implements MessagePrisma {
  @ApiProperty()
  read: boolean;
  @ApiProperty()
  content: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  sentAt: Date;
  @ApiProperty()
  chatId: string;
}
