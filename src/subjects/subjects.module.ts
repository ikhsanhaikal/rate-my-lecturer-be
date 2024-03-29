import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subjects.entity';
import { SubjectsResolver } from './subjects.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  providers: [SubjectsResolver],
})
export class SubjectModule {}
