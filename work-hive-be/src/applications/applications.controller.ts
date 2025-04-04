import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }

  @Get('/:projectId')
  findAll(@Param('projectId') projectId: string) {
    return this.applicationsService.findAll(projectId);
  }

  @Get('/one/:id')
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }

  @Get('/my-applications/:freelancerId')
  findMyApplications(@Param('freelancerId') freelancerId: string) {
    return this.applicationsService.findMyApplications(freelancerId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update(id, updateApplicationDto);
  }
}
