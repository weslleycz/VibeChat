import { HttpException, Injectable } from '@nestjs/common';
import {
  AddContactDTO,
  CreateUserDto,
  DeleteContactDTO,
  UserLoginDto,
} from './user.dto';
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
        return this.jwtservice.login(user.id);
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

      const contacts = await this.prismaService.user.findMany({
        where: {
          code: {
            in: user.contacts.map((contain) => contain),
          },
        },
        select: {
          name: true,
          code: true,
          messages: false,
          contacts: false,
          email: true,
          id: true,
          conversationIds: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
      return contacts;
    } catch (error) {
      throw new HttpException('Usuário inválido', 400);
    }
  }

  async addContact({ codeContact, userId }: AddContactDTO) {
    try {
      const userData = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });
      const contactIndex = userData.contacts.indexOf(codeContact);
      if (contactIndex === -1) {
        const contact = await this.prismaService.user.findUnique({
          where: {
            code: codeContact,
          },
        });
        if (contact != null) {
          const conversation = await this.prismaService.conversation.create({
            data: {
              usersIds: [userId, contact.id],
            },
          });
          const user = await this.prismaService.user.update({
            where: {
              id: userId,
            },
            data: {
              contacts: {
                push: contact.code,
              },
              conversationIds: {
                push: conversation.id,
              },
            },
          });
          if (user != null) {
            const contacts = await this.prismaService.user.findMany({
              where: {
                code: {
                  in: user.contacts.map((contain) => contain),
                },
              },
              select: {
                name: true,
                code: true,
                messages: false,
                contacts: false,
                email: true,
                id: true,
                conversationIds: true,
              },
              orderBy: {
                name: 'asc',
              },
            });
            return contacts;
          } else {
            throw new HttpException('Usuário inválido', 400);
          }
        } else {
          throw new HttpException('Usuário não encontrado', 404);
        }
      } else {
        const userData = await this.prismaService.user.findUnique({
          where: {
            id: userId,
          },
        });
        const contacts = await this.prismaService.user.findMany({
          where: {
            code: {
              in: userData.contacts.map((contain) => contain),
            },
          },
          select: {
            name: true,
            code: true,
            messages: false,
            contacts: false,
            email: true,
            id: true,
            conversationIds: true,
          },
          orderBy: {
            name: 'asc',
          },
        });
        return contacts;
      }
    } catch (error) {
      throw new HttpException('Usuário inválido', 400);
    }
  }

  async removeContact({ contactId, userId }: DeleteContactDTO) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });
      const contactIndex = user.contacts.indexOf(contactId);
      if (contactIndex !== -1) {
        const contacts = user.contacts.splice(contactIndex, 1);
        await this.prismaService.user.update({
          where: {
            id: userId,
          },
          data: {
            contacts: {
              set: contacts,
            },
          },
        });
        return 'Contato removido com sucesso.';
      } else {
        throw new HttpException('Contato não encontrado.', 404);
      }
    } catch (error) {
      throw new HttpException('Usuário inválido', 400);
    }
  }
}
