import { User as UserPrisma } from '@prisma/client';
export declare class UserModel implements UserPrisma {
    conversationIds: string[];
    code: string;
    contacts: string[];
    id: string;
    name: string;
    email: string;
    password: string;
}
