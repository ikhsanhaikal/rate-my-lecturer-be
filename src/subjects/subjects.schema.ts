import { Field, GraphQLTimestamp, ObjectType } from '@nestjs/graphql';
import { GraphQLInt, GraphQLString } from 'graphql';

@ObjectType('subjects', {})
export class SubjectsSchema {
  @Field(() => GraphQLInt)
  id: number;

  @Field(() => GraphQLString)
  name: string;

  @Field(() => GraphQLString)
  description: string;

  @Field(() => GraphQLTimestamp)
  createdAt: Date;

  @Field(() => GraphQLTimestamp)
  updatedAt: Date;
}
