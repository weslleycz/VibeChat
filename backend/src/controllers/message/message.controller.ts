import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InterceptorJwt } from 'src/middlewares';
import { MessageDTO } from './message.dto';
import { MessageModel } from './message.model';
import { MessageService } from './message.service';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('/:chatId')
  @UseInterceptors(InterceptorJwt)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Busca as mensagens por chat' })
  @ApiResponse({
    status: 200,
    description: 'Lista das mensagens.',
    type: MessageModel,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'O chat não foi encontrado.' })
  async getMessagesByChatId(
    @Param('chatId') chatId: string,
  ): Promise<MessageModel[]> {
    return await this.messageService.getMessagesByChatId(chatId);
  }

  @Post()
  @UseInterceptors(InterceptorJwt)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar nova mensagem' })
  @ApiResponse({
    status: 200,
    description: 'Lista das mensagens.',
    type: MessageModel,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'O chat não foi encontrado' })
  async sendMessage(@Body() data: MessageDTO) {
    return await this.messageService.sendMessage(data);
  }

  @Get('/getMessagesNotRead/:chatId/:userId')
  @UseInterceptors(InterceptorJwt)
  @ApiBearerAuth()
  @ApiOperation({ summary: '' })
  async getMessagesNotRead(
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
  ) {
    return await this.messageService.getMessagesNotRead(chatId, userId);
  }
}
