import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { LabsSchema } from 'src/labs/labs.schema';
import { LabsService } from 'src/labs/labs.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => LabsSchema)
export class LabsResolver {
  constructor(private labsService: LabsService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => LabsSchema, { name: 'lab', nullable: true })
  async lab(@Args('id', { type: () => Int }) id: number) {
    console.log(`id: ${id}`);
    const result = await this.labsService.findOne(id);
    console.log('findOne():', result);
    return result;
  }
}
