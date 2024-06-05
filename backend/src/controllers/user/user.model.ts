import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { User as UserPrisma } from '@prisma/client';

// @Injectable()
@ApiExtraModels()
export class UserModel implements UserPrisma {
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
