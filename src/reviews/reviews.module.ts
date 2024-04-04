import { Module } from '@nestjs/common';
import { ReviewResolver } from './reviews.resolver';
import { ReviewService } from './reviews.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [ReviewResolver, ReviewService],
  exports: [ReviewService],
})
export class ReviewsModule {}
