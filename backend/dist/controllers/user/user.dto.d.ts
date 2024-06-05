import { UserModel } from './user.model';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    validatePasswordConfirmation(): Promise<void>;
    validate(): Promise<void>;
}
export declare class UserLoginDto {
    email: string;
    password: string;
}
export declare class UserLoginResponseDto {
    token: string;
}
export type UserListContactsOmit = Omit<UserModel, 'password'>;
export declare class UserListContacts implements UserListContactsOmit {
    conversationIds: string[];
    name: string;
    email: string;
    code: string;
    contacts: string[];
    id: string;
    chatId: string;
}
export declare class AddContactDTO {
    userId: string;
    codeContact: string;
}
export declare class DeleteContactDTO {
    userId: string;
    contactId: string;
}
