import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeacherApplicationDto } from './dto/create-teacher-application.dto';
import { UpdateTeacherApplicationDto } from './dto/update-teacher-application.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeacherApplicationService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTeacherApplicationDto: CreateTeacherApplicationDto) {
    const createdApplication = await this.prisma.teacherApplication.create({
      data: { ...createTeacherApplicationDto },
    });

    if (!createdApplication) {
      throw new BadRequestException('Error while creating teacher application');
    }
    return createdApplication;
  }

  async findAll() {
    return await this.prisma.teacherApplication.findMany();
  }

  async findOne(id: number) {
    const application = await this.prisma.teacherApplication.findUnique({
      where: { id },
    });
    return application;
  }

  async findByUserId(userId: number) {
    const application = await this.prisma.teacherApplication.findFirst({
      where: { userId },
    });
    return application;
  }

  async update(id: number, updateTeacherApplicationDto: UpdateTeacherApplicationDto) {
    const updatedApplication = await this.prisma.teacherApplication.update({
      where: { id },
      data: { ...updateTeacherApplicationDto },
    });
    return updatedApplication;
  }

  async remove(id: number) {
    return await this.prisma.teacherApplication.delete({ where: { id } });
  }
}
