import {
  Body,
  Controller,
  Delete,
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
import { MessageDTO, MessagesNotReadDTO } from './message.dto';
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

  @Get('/messagesRead/:chatId/:userId')
  @UseInterceptors(InterceptorJwt)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Marca mensagens como lidas' })
  @ApiResponse({
    status: 200,
    description: 'Mensagens foram marcadas como lidas.',
  })
  @ApiResponse({ status: 400, description: 'O chat não foi encontrado' })
  async messagesRead(
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
  ) {
    await this.messageService.messagesRead(chatId, userId);
  }

  @Get('/getMessagesNotRead/:chatId/:userId')
  @UseInterceptors(InterceptorJwt)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna as mensagens não lidas' })
  @ApiResponse({
    status: 200,
    description: 'Retorna as mensagens não lidas',
    type: MessagesNotReadDTO,
  })
  @ApiResponse({ status: 400, description: 'O chat não foi encontrado' })
  async getMessagesNotRead(
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
  ) {
    return await this.messageService.getMessagesNotRead(chatId, userId);
  }

  @Delete('/messageDelete/:userId/:messageId')
  @UseInterceptors(InterceptorJwt)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar mensagem' })
  @ApiResponse({
    status: 200,
    description: 'Mensagem deletada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'O usuário ou a mensagem não foram encontrados.',
  })
  async messageDelete(
    @Param('userId') userId: string,
    @Param('messageId') messageId: string,
  ) {
    return await this.messageService.messageDelete(messageId, userId);
  }
}
