import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserLoginDto, UserLoginResponseDto } from './user.dto';
import { UserService } from './user.service';

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
}
