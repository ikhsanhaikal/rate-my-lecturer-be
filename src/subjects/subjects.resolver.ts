import { Query, Resolver } from '@nestjs/graphql';
import { Subject } from './subjects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectsSchema } from './subjects.schema';

@Resolver()
export class SubjectsResolver {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}
  @Query(() => [SubjectsSchema])
  async subjects(): Promise<Subject[]> {
    return this.subjectRepository.find({});
  }
}
