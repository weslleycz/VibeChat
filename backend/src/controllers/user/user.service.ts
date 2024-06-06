import { HttpException, Injectable } from '@nestjs/common';
import {
  AddContactDTO,
  CreateUserDto,
  DeleteContactDTO,
  UploadAvatarDTO,
  UserLoginDto,
} from './user.dto';
import { PrismaService } from 'src/services/prisma.service';
import { BcryptService } from 'src/services/bcrypt.service';
import { JWTService } from 'src/services/jwt.service';
import { uuid } from 'uuidv4';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly jwtservice: JWTService,
    private readonly eventEmmit: EventEmitter2,
  ) {}
  async create({ email, name, password }: CreateUserDto) {
    const existUser = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existUser === null) {
      const hashPassword = await this.bcryptService.hashPassword(password);
      const randomCode = uuid().substring(0, 5).toUpperCase();
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
      // Primeiro, obtemos o usuário e seus contatos
      const user = await this.prismaService.user.findUnique({
        where: {
          id,
        },
        select: {
          Contact: {
            select: {
              userContactId: true,
              chatId: true,
            },
          },
        },
      });

      // Verificamos se o usuário foi encontrado
      if (!user) {
        throw new HttpException('Usuário não encontrado', 404);
      }

      // Extraímos os IDs de contato dos contatos do usuário
      const contactIds = user.Contact.map((contact) => contact.userContactId);

      // Buscamos os detalhes dos contatos usando os IDs
      const contacts = await this.prismaService.user.findMany({
        where: {
          id: {
            in: contactIds,
          },
        },
      });

      // Mapeamos os contatos para adicionar o chatId correspondente
      const contactsWithChatId = contacts.map((contact) => {
        const contactData = user.Contact.find(
          (c) => c.userContactId === contact.id,
        );
        return {
          ...contact,
          chatId: contactData?.chatId,
        };
      });

      return contactsWithChatId;
    } catch (error) {
      throw new HttpException('Usuário inválido', 400);
    }
  }

  async addContact({ codeContact, userId }: AddContactDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    try {
      if (user.code != codeContact) {
        const friend = await this.prismaService.user.findUnique({
          where: {
            code: codeContact,
          },
        });
        await this.prismaService.chat.create({
          data: {
            contacts: {
              createMany: {
                data: [
                  {
                    userId: user.id,
                    userContactId: friend.id,
                  },
                  {
                    userId: friend.id,
                    userContactId: user.id,
                  },
                ],
              },
            },
          },
        });

        const userUpdate = await this.prismaService.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            Contact: {
              select: {
                userContactId: true,
                chatId: true,
              },
            },
          },
        });
        // Extraímos os IDs de contato dos contatos do usuário
        const contactIds = userUpdate.Contact.map(
          (contact) => contact.userContactId,
        );

        // Buscamos os detalhes dos contatos usando os IDs
        const contacts = await this.prismaService.user.findMany({
          where: {
            id: {
              in: contactIds,
            },
          },
        });

        // Mapeamos os contatos para adicionar o chatId correspondente
        const contactsWithChatId = contacts.map(async (contact) => {
          const contactData = userUpdate.Contact.find(
            (c) => c.userContactId === contact.id,
          );
          return {
            ...contact,
            chatId: contactData?.chatId,
          };
        });

        await this.eventEmmit.emit(userId);

        return contactsWithChatId;
      } else {
        throw new HttpException('Usuário inválido', 400);
      }
    } catch (error) {
      throw new HttpException('Usuário inválido', 400);
    }
  }

  async removeContact({ contactId, userId }: DeleteContactDTO) {
    try {
    } catch (error) {
      throw new HttpException('Usuário inválido', 400);
    }
  }

  async getUser(id: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          id,
        },
        select: {
          name: true,
          code: true,
          email: true,
          avatar: true,
        },
      });
    } catch (error) {
      throw new HttpException('Usuário inválido', 400);
    }
  }

  async uploadAvatar({ avatar, userId }: UploadAvatarDTO) {
    try {
      await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          avatar: avatar,
        },
      });
    } catch (error) {
      throw new HttpException('Usuário inválido', 400);
    }
  }
}
