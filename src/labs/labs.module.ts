import { Module } from '@nestjs/common';
import { LabsService } from './labs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lab } from './labs.entity';
import { LabsResolver } from './labs.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Lab])],
  providers: [LabsService, LabsResolver],
  exports: [LabsService],
})
export class LabsModule {}
