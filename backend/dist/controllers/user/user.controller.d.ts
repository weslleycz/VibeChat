import { AddContactDTO, CreateUserDto, UploadAvatarDTO, UserLoginDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: CreateUserDto): Promise<object>;
    login(data: UserLoginDto): Promise<object>;
    getContacts(id: string): Promise<{
        chatId: string;
        id: string;
        name: string;
        email: string;
        password: string;
        code: string;
        avatar: string;
    }[]>;
    addContact(data: AddContactDTO): Promise<Promise<{
        chatId: string;
        id: string;
        name: string;
        email: string;
        password: string;
        code: string;
        avatar: string;
    }>[]>;
    removeContact(userId: string, contactId: string): Promise<void>;
    getUser(userId: string): Promise<{
        name: string;
        email: string;
        code: string;
        avatar: string;
    }>;
    uploadAvatar(data: UploadAvatarDTO): Promise<void>;
}
