import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Application } from '@prisma/client';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    return this.prisma.application.create({
      data: { ...createApplicationDto, status: 'PENDING' },
    });
  }

  findAll(projectId: string) {
    return this.prisma.application.findMany({
      where: { projectId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.application.findUnique({
      where: { id },
    });
  }

  findMyApplications(id: string) {
    return this.prisma.application.findMany({
      where: { freelancerId: id },
      include: {
        user: true,
        project: true,
      },
    });
  }

  update(id: string, updateApplicationDto: UpdateApplicationDto) {
    return this.prisma.application.update({
      where: { id },
      data: updateApplicationDto,
    });
  }
}
