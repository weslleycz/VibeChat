import { CreateUser } from './user.dto';
import { PrismaService } from 'src/services/prisma.service';
import { BcryptService } from 'src/services/bcrypt.service';
import { JWTService } from 'src/services/jwt.service';
export declare class UserService {
    private readonly prismaService;
    private readonly bcryptService;
    private readonly jwtservice;
    constructor(prismaService: PrismaService, bcryptService: BcryptService, jwtservice: JWTService);
    create(data: CreateUser): Promise<object>;
}
