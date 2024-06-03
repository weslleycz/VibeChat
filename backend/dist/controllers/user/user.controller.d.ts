import { AddContactDTO, CreateUserDto, UserLoginDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: CreateUserDto): Promise<object>;
    login(data: UserLoginDto): Promise<object>;
    getContacts(id: string): Promise<{
        email: string;
        name: string;
        id: string;
        code: string;
        conversationIds: string[];
    }[]>;
    addContact(data: AddContactDTO): Promise<{
        email: string;
        name: string;
        id: string;
        code: string;
        conversationIds: string[];
    }[]>;
    removeContact(userId: string, contactId: string): Promise<string>;
}
