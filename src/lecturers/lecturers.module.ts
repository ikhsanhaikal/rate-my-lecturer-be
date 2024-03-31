import { Module } from '@nestjs/common';
import { LecturersService } from './lecturers.service';
import { LecturersResolver } from './lecturers.resolver';
import { LabsModule } from 'src/labs/labs.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [LabsModule, PrismaModule],
  providers: [LecturersService, LecturersResolver],
  exports: [LecturersService],
})
export class LecturersModule {}
