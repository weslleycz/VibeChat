export declare class CreateUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    validatePasswordConfirmation(): Promise<void>;
    validate(): Promise<void>;
}
