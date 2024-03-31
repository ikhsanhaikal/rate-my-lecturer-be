import { Query, Resolver } from '@nestjs/graphql';
import { SubjectsSchema } from './subjects.schema';
import { Subject } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver()
export class SubjectsResolver {
  constructor(private prisma: PrismaService) {}
  @Query(() => [SubjectsSchema])
  async subjects(): Promise<Subject[]> {
    return this.prisma.subject.findMany({});
  }
}
