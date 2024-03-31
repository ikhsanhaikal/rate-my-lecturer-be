import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LecturerSchema } from './lecturers.schema';
import { LabsSchema } from 'src/labs/labs.schema';
import { LabsService } from 'src/labs/labs.service';
import { GraphQLString } from 'graphql';
import { LecturersService } from './lecturers.service';
import { Lecturer } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => LecturerSchema)
export class LecturersResolver {
  constructor(
    private lecturersService: LecturersService,
    private labsService: LabsService,
  ) {}

  @Query(() => [LecturerSchema])
  async lectures(
    @Args('cursorId', { type: () => Int, nullable: true }) cursorId: number,
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
    @Args('subjects', { type: () => [Int], nullable: true }) subjects: number[],
    @Args('characters', { type: () => [Int], nullable: true })
    characters: number[],
    @Args('gender', { type: () => GraphQLString, nullable: true })
    gender: string,
  ): Promise<Array<Lecturer>> {
    console.log(`cursorId: `, cursorId);
    console.log(`limit: `, limit);
    console.log(`subjects: `, subjects);
    console.log(`character: `, characters);
    console.log(`gender: `, gender);

    return this.lecturersService.lecturers({
      skip: cursorId > 0 ? 1 : undefined,
      take: limit ?? 12,
      cursor: cursorId !== null ? { id: cursorId } : undefined,
      where: undefined,
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
  @ResolveField('lab', (returns) => LabsSchema)
  async getLabByLecturer(@Parent() parent: Lecturer) {
    //const { id } = lecturer;
    console.log('parent: ', parent);
    const labAssociated = this.labsService.findOne(parent.labId);
    console.log('labAssociated: ', labAssociated);
    return labAssociated;
  }
}
