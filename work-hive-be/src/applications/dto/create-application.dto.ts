import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({
    description: 'Project ID',
    example: '123456',
  })
  @IsString()
  projectId: string;

  @ApiProperty({
    description: 'User ID',
    example: '123456',
  })
  @IsString()
  freelancerId: string;

  @ApiProperty({
    description: 'Skills',
    example: 'skill1, skill2',
  })
  @IsString()
  skills: string;

  @ApiProperty({
    description: 'Hourly rate',
    example: 100,
  })
  hourlyRate: number;

  @ApiProperty({
    description: 'Bio',
    example: 'This is a bio',
  })
  @IsString()
  bio: string;

  @ApiProperty({
    description: 'Portfolio',
    example: 'https://portfolio.com',
  })
  @IsString()
  portfolio: string;
}
