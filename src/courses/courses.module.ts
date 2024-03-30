import { Module } from '@nestjs/common';
import { CourseResolver } from './courses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './courses.entity';
import { Lecturer } from 'src/lecturers/lecturers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Lecturer])],
  providers: [CourseResolver],
})
export class CoursesModule {}
