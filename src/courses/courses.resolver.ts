import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CourseSchema } from './courses.schema';
import { LecturerSchema } from 'src/lecturers/lecturers.schema';
import { SubjectsSchema } from 'src/subjects/subjects.schema';
import { GraphQLInt } from 'graphql';
import { Class as Course, Lecturer, Subject } from '@prisma/client';
import { CourseService } from './course.service';
import { LecturersService } from 'src/lecturers/lecturers.service';
import { SubjectService } from 'src/subjects/subject.service';

@Resolver(() => CourseSchema)
export class CourseResolver {
  constructor(
    private courseService: CourseService,
    private lecturerService: LecturersService,
    private subjectService: SubjectService,
  ) {}

  @Query(() => [CourseSchema])
  async coursesByLecturerId(
    @Args('lecturerId', { type: () => GraphQLInt })
    lecturerId: number,
  ): Promise<Course[]> {
    return this.courseService.coursesByLecturer(lecturerId);
  }

  @ResolveField('lecturer', () => LecturerSchema)
  async lecturer(@Parent() parent: Course): Promise<Lecturer> {
    return this.lecturerService.lecturer(parent.lecturerId);
  }

  @ResolveField('subject', () => SubjectsSchema)
  async subject(@Parent() parent: Course): Promise<Subject> {
    console.log(`parent: `, parent);
    const result = this.subjectService.subject(parent.subjectId);
    return result;
  }
}
