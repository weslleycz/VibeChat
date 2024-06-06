import { AddContactDTO, CreateUserDto, DeleteContactDTO, UploadAvatarDTO, UserLoginDto } from './user.dto';
import { PrismaService } from 'src/services/prisma.service';
import { BcryptService } from 'src/services/bcrypt.service';
import { JWTService } from 'src/services/jwt.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class UserService {
    private readonly prismaService;
    private readonly bcryptService;
    private readonly jwtservice;
    private readonly eventEmmit;
    constructor(prismaService: PrismaService, bcryptService: BcryptService, jwtservice: JWTService, eventEmmit: EventEmitter2);
    create({ email, name, password }: CreateUserDto): Promise<object>;
    login({ email, password }: UserLoginDto): Promise<object>;
    getContacts(id: string): Promise<{
        chatId: string;
        id: string;
        name: string;
        email: string;
        password: string;
        code: string;
        avatar: string;
    }[]>;
    addContact({ codeContact, userId }: AddContactDTO): Promise<Promise<{
        chatId: string;
        id: string;
        name: string;
        email: string;
        password: string;
        code: string;
        avatar: string;
    }>[]>;
    removeContact({ contactId, userId }: DeleteContactDTO): Promise<void>;
    getUser(id: string): Promise<{
        email: string;
        name: string;
        code: string;
        avatar: string;
    }>;
    uploadAvatar({ avatar, userId }: UploadAvatarDTO): Promise<void>;
}
