import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

@ApiExtraModels()
export class MessageDTO {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  chatId: string;

  @ApiProperty()
  @IsString()
  content: string;
}

@ApiExtraModels()
export class MessagesNotReadDTO {
  @ApiProperty()
  notRead: number;
  @ApiProperty()
  @IsString()
  @IsNumber()
  lastMessage: string;
}
