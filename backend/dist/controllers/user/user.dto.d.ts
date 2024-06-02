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
