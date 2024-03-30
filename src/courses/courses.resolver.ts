import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { Course } from './courses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseSchema } from './courses.schema';
import { LecturerSchema } from 'src/lecturers/lecturers.schema';
import { Lecturer } from 'src/lecturers/lecturers.entity';
import { SubjectsSchema } from 'src/subjects/subjects.schema';
import { Subject } from 'src/subjects/subjects.entity';
import { GraphQLInt } from 'graphql';

@Resolver(() => CourseSchema)
export class CourseResolver {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Lecturer)
    private lecturerRepository: Repository<Lecturer>,
  ) {}

  @Query(() => [CourseSchema])
  async courses(): Promise<Course[]> {
    return this.courseRepository.find({});
  }

  @Query(() => [CourseSchema])
  async coursesByLecturerId(
    @Args('lecturerId', { type: () => GraphQLInt })
    lecturerId: number,
  ): Promise<Course[]> {
    return this.courseRepository.find({
      where: { lecturer: { id: lecturerId } },
    });
  }

  @ResolveField('lecturer', () => LecturerSchema)
  async lecturer(@Parent() parent: Course): Promise<Lecturer> {
    return this.lecturerRepository.findOneBy({ id: parent.lecturerId });
  }

  @ResolveField('subject', () => SubjectsSchema)
  async subject(@Parent() parent: Course): Promise<Subject> {
    console.log(`parent: `, parent);
    const result = await this.courseRepository.findOne({
      where: { id: parent.id },
      relations: {
        subject: true,
      },
    });
    return result.subject;
  }
}
