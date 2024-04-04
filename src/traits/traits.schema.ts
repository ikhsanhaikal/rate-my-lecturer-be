import { Field, GraphQLTimestamp, ObjectType } from '@nestjs/graphql';
import { GraphQLInt } from 'graphql';

@ObjectType()
export class TraitSchema {
  @Field(() => GraphQLInt)
  id: number;
  @Field()
  name: string;
  @Field(() => GraphQLTimestamp)
  createdAt: Date;
  @Field(() => GraphQLTimestamp)
  updatedAt: Date;
}
