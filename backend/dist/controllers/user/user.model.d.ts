import { User as UserPrisma } from '@prisma/client';
export declare class UserModel implements UserPrisma {
    code: string;
    contacts: string[];
    id: string;
    name: string;
    email: string;
    password: string;
}
