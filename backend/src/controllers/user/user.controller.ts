import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUser } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 200, description: 'Usuário criado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Usuário já possui cadastro.',
  })
  @ApiResponse({
    status: 409,
    description: 'Usuário já possui cadastro.',
  })
  async create(@Body() data: CreateUser) {
    return this.userService.create(data);
  }
}
