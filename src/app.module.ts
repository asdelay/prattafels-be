import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LessonsModule } from './lessons/lessons.module';
import { OfficesModule } from './offices/offices.module';
import { TeacherApplicationModule } from './teacher-application/teacher-application.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    LessonsModule,
    OfficesModule,
    TeacherApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
