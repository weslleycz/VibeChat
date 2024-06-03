import { AddContactDTO, CreateUserDto, UserListContacts, UserLoginDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: CreateUserDto): Promise<object>;
    login(data: UserLoginDto): Promise<object>;
    getContacts(id: string): Promise<UserListContacts[]>;
    addContact(data: AddContactDTO): Promise<{
        email: string;
        name: string;
        id: string;
        code: string;
        contacts: string[];
        messages: {
            id: string;
            userId: string;
            sentAt: Date;
            content: string;
            conversationId: string;
        }[];
        conversations: {
            id: string;
            userId: string;
            conversationId: string;
        }[];
    }[]>;
}
