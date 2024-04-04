import { Field, GraphQLTimestamp, ObjectType } from '@nestjs/graphql';
import { Class as Course, Trait, User } from '@prisma/client';
import { GraphQLFloat, GraphQLInt, GraphQLString } from 'graphql';
import { CourseSchema } from 'src/courses/courses.schema';
import { TraitSchema } from 'src/traits/traits.schema';
import { UserSchema } from 'src/users/users.schema';

@ObjectType('review')
export class ReviewSchema {
  @Field(() => GraphQLInt)
  id: number;
  @Field(() => GraphQLString)
  comment: string;
  @Field(() => GraphQLFloat)
  rating: number;
  @Field(() => [TraitSchema])
  tags: Trait[];
  @Field(() => [CourseSchema], { name: 'course' })
  class: Course[];
  @Field(() => UserSchema)
  reviewer: User[];
  @Field(() => GraphQLTimestamp)
  createdAt: Date;
}
