import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidationError,
  validate,
} from 'class-validator';
import { UserModel } from './user.model';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'A senha deve ter no mínimo 8 caracteres',
  })
  password: string;

  @ApiProperty({
    description: 'Confirmação da senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  async validatePasswordConfirmation() {
    if (this.password !== this.confirmPassword) {
      const error = new ValidationError();
      error.property = 'confirmPassword';
      error.constraints = {
        matchesProperty: 'As senhas devem ser iguais',
      };
      throw error;
    }
  }

  async validate() {
    await validate(plainToClass(CreateUserDto, this));
    await this.validatePasswordConfirmation();
  }
}

export class UserLoginDto {
  @ApiProperty({
    description: 'Email do usuário',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserLoginResponseDto {
  @ApiProperty({ example: 'generated-jwt-token' })
  token: string;
}

export type UserListContactsOmit = Omit<UserModel, 'password'>;

export class UserListContacts implements UserListContactsOmit {
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  conversationIds: string[];
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  contacts: string[];
  @ApiProperty()
  id: string;
  chatId: string;
}

export class AddContactDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  codeContact: string;
}

export class DeleteContactDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  contactId: string;
}

export class GetUseDTO {
  name: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  avatar: string;
}

export class UploadAvatarDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
