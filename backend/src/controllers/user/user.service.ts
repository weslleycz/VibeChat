import { HttpException, Injectable } from '@nestjs/common';
import { CreateUser } from './user.dto';
import { PrismaService } from 'src/services/prisma.service';
import { BcryptService } from 'src/services/bcrypt.service';
import { JWTService } from 'src/services/jwt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly jwtservice: JWTService,
  ) {}
  async create(data: CreateUser) {
    const existUser = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existUser === null) {
      const hashPassword = await this.bcryptService.hashPassword(data.password);
      const user = await this.prismaService.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: hashPassword,
        },
      });
      return this.jwtservice.login(user.id);
    } else {
      throw new HttpException('Usuário já possui cadastro.', 409);
    }
  }
}
