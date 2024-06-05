import { User as UserPrisma } from '@prisma/client';
export declare class UserModel implements UserPrisma {
    id: string;
    name: string;
    email: string;
    password: string;
    code: string;
}
