import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChatGatewayDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  chatId: string;
}
