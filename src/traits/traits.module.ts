import { Module } from '@nestjs/common';
import { TraitResolver } from './traits.resolver';
import { TraitService } from './traits.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TraitResolver, TraitService],
})
export class TraitsModule {}
