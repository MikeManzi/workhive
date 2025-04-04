import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateApplicationDto } from './create-application.dto';
import { ApplicationStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
  @ApiProperty({
    description: 'Application status',
    example: 'ACCEPTED',
  })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}
