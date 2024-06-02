import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  validate,
  ValidationError,
  IsEmail,
} from 'class-validator';
import { plainToClass } from 'class-transformer';

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
