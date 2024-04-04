import { Query, Resolver } from '@nestjs/graphql';
import { TraitSchema } from './traits.schema';
import { Trait } from '@prisma/client';
import { TraitService } from './traits.service';

@Resolver(() => TraitSchema)
export class TraitResolver {
  constructor(private traitService: TraitService) {}
  @Query(() => [TraitSchema], { name: 'characters' })
  async traits(): Promise<Trait[]> {
    return this.traitService.findAll();
  }
}
