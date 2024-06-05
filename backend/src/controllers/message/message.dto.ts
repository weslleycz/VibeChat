import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
