import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LecturerSchema } from './lecturers.schema';
import { LecturersService } from './lecturers.service';
import { LabsSchema } from 'src/labs/labs.schema';
import { LabsService } from 'src/labs/labs.service';
import { Lecturer } from './lecturers.entity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => LecturerSchema)
export class LecturersResolver {
  constructor(
    private lecturersService: LecturersService,
    private labsService: LabsService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => LecturerSchema, { name: 'lecturer', nullable: true })
  async lecturer(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Lecturer> {
    console.log(`id: ${id}`);
    const result = await this.lecturersService.findOne(id);
    console.log('findOne():', result);
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ResolveField('lab', (returns) => LabsSchema)
  async getLabByLecturer(@Parent() lecturer: LecturerSchema) {
    const { id } = lecturer;
    return this.labsService.findOne(id);
  }
}
