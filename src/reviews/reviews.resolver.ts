import {
  Args,
  Context,
  Field,
  InputType,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphQLFloat, GraphQLInt, GraphQLString } from 'graphql';
import { ReviewService } from './reviews.service';
import { ReviewSchema } from './reviews.schema';
import { Class as Course, Review, Trait, User } from '@prisma/client';
import { CourseSchema } from 'src/courses/courses.schema';
import { UserSchema } from 'src/users/users.schema';
import { UserService } from 'src/users/users.service';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TraitSchema } from 'src/traits/traits.schema';
@InputType()
export class ReviewInput {
  @Field(() => GraphQLString)
  comment: string;
  @Field(() => GraphQLFloat)
  rating: number;
  @Field(() => [GraphQLInt])
  tags: number[];
  @Field(() => GraphQLInt)
  course: number;
}

interface MyContext {
  req: Request;
}

@Resolver(() => ReviewSchema)
export class ReviewResolver {
  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
  ) {}
  @Query(() => [ReviewSchema])
  async reviews(
    @Args('lecturerId', { type: () => GraphQLInt }) lecturerId: number,
    @Args('cursorId', { type: () => GraphQLInt, nullable: true })
    cursorId: number,
    @Args('limit', { type: () => GraphQLInt, nullable: true, defaultValue: 5 })
    limit: number,
  ) {
    console.log(lecturerId);
    return this.reviewService.reviews({
      skip: cursorId > 0 ? 1 : undefined,
      take: limit ?? 12,
      cursor: cursorId !== 0 ? { id: cursorId } : undefined,
      where: undefined,
      orderBy: undefined,
    });
  }

  @Mutation(() => ReviewSchema)
  @UseGuards(new AuthGuard())
  async addReview(
    @Args('reviewInput', { type: () => ReviewInput }) input: ReviewInput,
    @Context() ctx: MyContext,
  ): Promise<Review> {
    console.log('mutation addReview was called');
    console.log(`reviewInput: `, input);
    console.log('session: ', ctx.req.session);
    const user = await this.userService.findOne(ctx.req.session.user.userId);
    console.log(user);
    return this.reviewService.addReview(input, user.id);
  }

  @ResolveField(() => CourseSchema, { name: 'course' })
  async course(@Parent() parent: Review): Promise<Course> {
    console.log(`ResolveField course parent: ReviewSchema`, parent);
    return this.reviewService.course(parent.id);
  }

  @ResolveField(() => UserSchema, { name: 'reviewer' })
  async reviewer(@Parent() parent: Review): Promise<User> {
    console.log(`ResolveField reviewer parent: ReviewSchema`, parent);
    return this.userService.findOne(parent.reviewerId);
  }

  @ResolveField(() => TraitSchema, { name: 'tags' })
  async tags(@Parent() parent: Review): Promise<Trait[]> {
    console.log(`ResolveField course parent: ReviewSchema`, parent);
    return this.reviewService.tags(parent.id);
  }
}
