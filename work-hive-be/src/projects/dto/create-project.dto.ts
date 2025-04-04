import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Name of the project',
    example: 'Project 1',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the project',
    example: 'This is a project description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Budget of the project',
    example: 1000,
  })
  budget: number;

  @ApiProperty({
    description: 'Deadline of the project',
    example: '2021-12-12',
  })
  deadline: Date;

  @ApiProperty({
    description: 'Skills required for the project',
    example: ['skill1', 'skill2'],
  })
  @IsString({ each: true })
  skills: string[];

  @ApiProperty({
    description: 'Owner of the project',
    example: '123456',
  })
  @IsString()
  ownerId: string;
}
