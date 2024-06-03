import { ApiProperty } from '@nestjs/swagger';
import { User as UserPrisma } from '@prisma/client';

export class UserModel implements UserPrisma {
  @ApiProperty()
  code: string;
  @ApiProperty()
  contacts: string[];
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
