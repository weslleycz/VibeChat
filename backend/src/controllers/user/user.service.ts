import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, UserLoginDto } from './user.dto';
import { PrismaService } from 'src/services/prisma.service';
import { BcryptService } from 'src/services/bcrypt.service';
import { JWTService } from 'src/services/jwt.service';
import { uuid } from 'uuidv4';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly jwtservice: JWTService,
  ) {}
  async create({ email, name, password }: CreateUserDto) {
    const existUser = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existUser === null) {
      const hashPassword = await this.bcryptService.hashPassword(password);
      const randomCode = uuid().substring(0, 6).toUpperCase();
      const user = await this.prismaService.user.create({
        data: {
          email: email,
          name: name,
          password: hashPassword,
          code: randomCode,
        },
      });
      return this.jwtservice.login(user.id);
    } else {
      throw new HttpException('Usuário já possui cadastro.', 409);
    }
  }

  async login({ email, password }: UserLoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (user === null) {
      throw new HttpException('Usuário ou senha inválidos', 401);
    } else {
      if (await this.bcryptService.comparePasswords(password, user.password)) {
        return {
          token: this.jwtservice.login(user.id),
        };
      } else {
        throw new HttpException('Usuário ou senha inválidos', 401);
      }
    }
  }

  async getContacts(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });
      return user.contacts;
    } catch (error) {
      throw new HttpException('Usuário inválido', 401);
    }
  }
}
