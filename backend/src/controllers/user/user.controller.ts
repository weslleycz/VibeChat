import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AddContactDTO,
  CreateUserDto,
  GetUseDTO,
  UploadAvatarDTO,
  UserListContacts,
  UserLoginDto,
  UserLoginResponseDto,
} from './user.dto';
import { UserService } from './user.service';
import { InterceptorJwt } from 'src/middlewares';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário criado com sucesso.',
    type: UserLoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Usuário já possui cadastro.',
  })
  @ApiResponse({
    status: 409,
    description: 'Usuário já possui cadastro.',
  })
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Realizar login do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso.',
    type: UserLoginResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Usuário ou senha inválidos.' })
  async login(@Body() data: UserLoginDto) {
    return this.userService.login(data);
  }

  @Get('/getContacts/:id')
  @ApiOperation({ summary: 'Busca a lista de contatos do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Lista de contatos do usuário.',
    type: UserListContacts,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Usuário inválido.' })
  @UseInterceptors(InterceptorJwt)
  @ApiBearerAuth()
  async getContacts(@Param('id') id: string) {
    return await this.userService.getContacts(id);
  }

  @Put('/addContact')
  @ApiOperation({ summary: 'Adicionar contato' })
  @ApiResponse({ status: 400, description: 'Usuário inválido.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @UseInterceptors(InterceptorJwt)
  @ApiBearerAuth()
  async addContact(@Body() data: AddContactDTO) {
    return await this.userService.addContact(data);
  }

  @Delete('/removeContact/:userId/:contactId')
  @ApiOperation({ summary: 'Remover um contato' })
  @ApiResponse({
    status: 200,
    description: 'Contato removido com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Usuário inválido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Contato não encontrado.',
  })
  @UseInterceptors(InterceptorJwt)
  @ApiBearerAuth()
  async removeContact(
    @Param('userId') userId: string,
    @Param('contactId') contactId: string,
  ) {
    return await this.userService.removeContact({ contactId, userId });
  }

  @ApiOperation({ summary: 'Retorna o perfil do usuario.' })
  @UseInterceptors(InterceptorJwt)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Retorna o perfil do usuario.',
    type: GetUseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Usuário inválido.',
  })
  @Get('/getUser/:userId')
  async getUser(@Param('userId') userId: string) {
    return await this.userService.getUser(userId);
  }

  @Put('/uploadAvatar')
  async uploadAvatar(@Body() data: UploadAvatarDTO) {
    return await this.userService.uploadAvatar(data);
  }
}
