import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecturer } from './lecturers.entity';
import { LecturersService } from './lecturers.service';
import { LecturersResolver } from './lecturers.resolver';
import { LabsModule } from 'src/labs/labs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lecturer]), LabsModule],
  providers: [LecturersService, LecturersResolver],
  exports: [LecturersService],
})
export class LecturersModule {}
