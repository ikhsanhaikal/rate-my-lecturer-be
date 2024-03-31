import { Module } from '@nestjs/common';
import { CourseResolver } from './courses.resolver';
import { CourseService } from './course.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LecturersModule } from 'src/lecturers/lecturers.module';
import { SubjectModule } from 'src/subjects/subjects.module';

@Module({
  imports: [PrismaModule, LecturersModule, SubjectModule],
  providers: [CourseService, CourseResolver],
})
export class CoursesModule {}
