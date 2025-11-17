import { Module } from '@nestjs/common';
import { TeacherApplicationService } from './teacher-application.service';
import { TeacherApplicationController } from './teacher-application.controller';

@Module({
  controllers: [TeacherApplicationController],
  providers: [TeacherApplicationService],
})
export class TeacherApplicationModule {}
