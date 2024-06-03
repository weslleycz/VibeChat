import { CreateUserDto, UserLoginDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: CreateUserDto): Promise<object>;
    login(data: UserLoginDto): Promise<{
        token: Promise<object>;
    }>;
}
