import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeacherApplicationService } from './teacher-application.service';
import { CreateTeacherApplicationDto } from './dto/create-teacher-application.dto';
import { UpdateTeacherApplicationDto } from './dto/update-teacher-application.dto';

@Controller('teacher-application')
export class TeacherApplicationController {
  constructor(
    private readonly teacherApplicationService: TeacherApplicationService,
  ) {}

  @Post()
  create(@Body() createTeacherApplicationDto: CreateTeacherApplicationDto) {
    return this.teacherApplicationService.create({
      ...createTeacherApplicationDto,
    });
  }

  @Get()
  findAll() {
    return this.teacherApplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherApplicationService.findOne(+id);
  }
  @Get('/user/:id')
  findByUserId(@Param('id') userId: string) {
    return this.teacherApplicationService.findByUserId(+userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeacherApplicationDto: UpdateTeacherApplicationDto,
  ) {
    return this.teacherApplicationService.update(
      +id,
      updateTeacherApplicationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherApplicationService.remove(+id);
  }
}
