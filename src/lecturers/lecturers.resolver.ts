import {
  Args,
  Field,
  InputType,
  Int,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LecturerSchema } from './lecturers.schema';
import { LabsSchema } from 'src/labs/labs.schema';
import { LabsService } from 'src/labs/labs.service';
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import { LecturersService } from './lecturers.service';
import { Gender, Lecturer } from '@prisma/client';
import { SubjectsSchema } from 'src/subjects/subjects.schema';
import { TraitSchema } from 'src/traits/traits.schema';
import { CourseSchema } from 'src/courses/courses.schema';
import { ReviewSchema } from 'src/reviews/reviews.schema';

@InputType()
class FilterType {
  @Field(() => [GraphQLInt], { nullable: true })
  characters: number[];
  @Field(() => [GraphQLInt], { nullable: true })
  subjects: number[];
  @Field(() => GraphQLString, { nullable: true })
  gender: string;
}

@ObjectType('searchresult')
export class SearchResult {
  @Field(() => [LecturerSchema])
  data: Lecturer[];
  @Field(() => GraphQLInt)
  total: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => LecturerSchema)
export class LecturersResolver {
  constructor(
    private lecturersService: LecturersService,
    private labsService: LabsService,
  ) {}

  @Query(() => [LecturerSchema])
  async lecturers(
    @Args('cursorId', { type: () => Int, nullable: true }) cursorId: number,
    @Args('limit', { type: () => Int }) limit: number,
    @Args('filter', { type: () => FilterType })
    filter: FilterType,
    //@Args('subjects', { type: () => [Int], nullable: true }) subjects: number[],
    //@Args('characters', { type: () => [Int], nullable: true })
    //characters: number[],
    //@Args('gender', { type: () => GraphQLString, nullable: true })
    //gender: string,
  ): Promise<Array<Lecturer>> {
    console.log(`lecturers i was called`);
    console.log(`cursorId: `, cursorId);
    console.log(`limit: `, limit);
    console.log(`filter `, filter);
    const { gender, characters, subjects } = filter;

    function foo1() {
      return subjects.map((s) => {
        return {
          courses: { some: { subjectId: { equals: s } } },
        };
      });
    }
    function foo2() {
      return characters.map((c) => {
        return {
          courses: {
            some: {
              reviews: {
                some: { tags: { some: { traitId: { equals: c } } } },
              },
            },
          },
        };
      });
    }

    const spreadSubIfExist = subjects !== null ? foo1() : [];
    const spreadCharIfExist = characters !== null ? foo2() : [];
    return this.lecturersService.lecturers({
      skip: cursorId ? 1 : undefined,
      take: limit ?? 12,
      cursor: cursorId ? { id: cursorId } : undefined,
      where: {
        gender: { equals: (gender as Gender) ?? undefined },
        AND:
          subjects !== null || characters !== null
            ? [...spreadSubIfExist, ...spreadCharIfExist]
            : undefined,
      },
      orderBy: undefined,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => LecturerSchema, { name: 'lecturer', nullable: true })
  async lecturer(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Lecturer> {
    console.log(`id: ${id}`);
    const result = await this.lecturersService.lecturer(id);
    console.log('findOne():', result);
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => SearchResult)
  async search(
    @Args('limit', { type: () => GraphQLInt }) limit: number,
    @Args('name', { type: () => GraphQLString }) name: string,
    @Args('cursor', { type: () => GraphQLInt, nullable: true }) cursor: number,
    @Args('count', { type: () => GraphQLBoolean, nullable: true })
    count: boolean,
    @Args('skip', { type: () => GraphQLInt, nullable: true }) skip: number,
  ): Promise<SearchResult> {
    const result = await this.lecturersService.searchByName(
      limit,
      cursor,
      name,
      count,
      skip,
    );

    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ResolveField('lab', (returns) => LabsSchema)
  async getLabByLecturer(@Parent() parent: Lecturer) {
    //const { id } = lecturer;
    const labAssociated = this.labsService.findOne(parent.labId);
    return labAssociated;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ResolveField('subjects', (returns) => [SubjectsSchema])
  async getSubjectsByLecturer(@Parent() parent: Lecturer) {
    return this.lecturersService.subjects(parent.id);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ResolveField('courses', (returns) => [CourseSchema])
  async getCoursesByLecturer(@Parent() parent: Lecturer) {
    return this.lecturersService.courses(parent.id);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ResolveField('rating', (returns) => GraphQLFloat)
  async rating(@Parent() parent: Lecturer) {
    return this.lecturersService.rating(parent.id);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ResolveField('tags', (returns) => [TraitSchema])
  async tags(@Parent() parent: Lecturer) {
    return this.lecturersService.tags(parent.id);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ResolveField('reviews', (returns) => [ReviewSchema])
  async reviews(@Parent() parent: Lecturer) {
    return this.lecturersService.reviews(parent.id);
  }
}
