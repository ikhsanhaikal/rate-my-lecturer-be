import { Field, GraphQLTimestamp, ObjectType } from '@nestjs/graphql';
import { GraphQLInt, GraphQLString } from 'graphql';

@ObjectType()
export class UserSchema {
  @Field(() => GraphQLInt)
  id: number;
  @Field(() => GraphQLString)
  email: string;
  @Field(() => GraphQLString)
  username: string;
  @Field(() => GraphQLTimestamp)
  createdAt: Date;
  @Field(() => GraphQLString)
  updatedAt: Date;
}
