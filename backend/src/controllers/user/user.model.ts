import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { User as UserPrisma } from '@prisma/client';

// @Injectable()
@ApiExtraModels()
export class UserModel implements UserPrisma {
  avatar: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  code: string;
}
