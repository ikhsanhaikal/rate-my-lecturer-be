import { Module } from '@nestjs/common';
import { LabsService } from './labs.service';
import { LabsResolver } from './labs.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LabsService, LabsResolver],
  exports: [LabsService],
})
export class LabsModule {}
