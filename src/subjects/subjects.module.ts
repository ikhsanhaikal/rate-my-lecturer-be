import { Module } from '@nestjs/common';
import { SubjectsResolver } from './subjects.resolver';
import { SubjectService } from './subject.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SubjectsResolver, SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
