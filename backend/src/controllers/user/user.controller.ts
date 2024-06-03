import {
  Body,
  Controller,
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
  @ApiResponse({ status: 401, description: 'Usuário inválido.' })
  @UseInterceptors(InterceptorJwt)
  @ApiBearerAuth()
  async getContacts(@Param('id') id: string): Promise<UserListContacts[]> {
    return await this.userService.getContacts(id);
  }

  @Put('/addContact')
  @ApiOperation({ summary: 'Adicionar contato' })
  @ApiResponse({ status: 401, description: 'Usuário inválido.' })
  @UseInterceptors(InterceptorJwt)
  @ApiBearerAuth()
  async addContact(@Body() data: AddContactDTO) {
    return await this.userService.addContact(data);
  }
}
