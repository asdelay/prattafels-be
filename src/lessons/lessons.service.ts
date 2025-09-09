import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}
  async create(createLessonDto: CreateLessonDto) {
    const newLesson = await this.prisma.lesson.create({
      data: { ...createLessonDto },
    });
    return newLesson;
  }

  async findAll() {
    const lessons = await this.prisma.lesson.findMany();
    if (!lessons)
      throw new HttpException(
        { message: 'Lessons not found', code: 'BAD_REQUEST' },
        HttpStatus.BAD_REQUEST,
      );
    return lessons;
  }

  async findOne(id: number) {
    const lesson = await this.prisma.lesson.findFirst({ where: { id } });
    if (!lesson)
      throw new HttpException(
        { message: 'Lesson not found', code: 'BAD_REQUEST' },
        HttpStatus.BAD_REQUEST,
      );
    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.prisma.lesson.findFirst({ where: { id } });
    if (!lesson)
      throw new HttpException(
        { message: 'Lesson not found', code: 'BAD_REQUEST' },
        HttpStatus.BAD_REQUEST,
      );

    const updatedLesson = await this.prisma.lesson.update({
      where: { id },
      data: { ...updateLessonDto },
    });
    return updatedLesson;
  }

  async remove(id: number) {
    const lesson = await this.prisma.lesson.findFirst({ where: { id } });
    if (!lesson)
      throw new HttpException(
        { message: 'Lesson not found', code: 'BAD_REQUEST' },
        HttpStatus.BAD_REQUEST,
      );
    const removedLesson = await this.prisma.lesson.delete({ where: { id } });
    return removedLesson;
  }
}
