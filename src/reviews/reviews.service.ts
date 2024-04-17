import { Injectable } from '@nestjs/common';
import { Prisma, Class as Course, Review, Trait } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewInput } from './reviews.resolver';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}
  async reviews(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReviewWhereUniqueInput;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput;
  }): Promise<Review[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.review.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  async addReview(input: ReviewInput, currentUser: number) {
    const foo = input.tags.map((tag) => {
      const tmp = { traitId: tag } as Prisma.TagCreateManyReviewInput;
      return tmp;
    });
    const result = await this.prisma.review.create({
      data: {
        comment: input.comment,
        class: {
          connect: {
            id: input.course,
          },
        },
        rating: input.rating,
        tags: {
          createMany: {
            data: [...foo],
          },
        },
        reviewer: {
          connect: { id: currentUser },
        },
      },
    });
    return result;
  }
  async course(reviewId: number): Promise<Course> {
    const result = await this.prisma.review.findFirst({
      select: {
        class: true,
      },
      where: { id: reviewId },
    });
    return result.class;
  }

  async tags(reviewId: number): Promise<Trait[]> {
    const result = await this.prisma.review.findFirst({
      select: {
        tags: {
          select: {
            trait: true,
          },
        },
      },
      where: { id: reviewId },
    });
    return result.tags.map((tag) => tag.trait);
  }
}
