import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user.',
    example: 'someone@example.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The first name of the user.',
  })
  @IsString()
  firstName?: string;

  @ApiProperty({
    description: 'The last name of the user.',
  })
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: 'The password of the user.',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The role of the user.',
    example: 'USER',
  })
  @IsEnum(Role)
  role: Role;
}
