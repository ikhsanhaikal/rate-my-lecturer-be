/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { LabsSchema } from 'src/labs/labs.schema';
@ObjectType('lecturer', { description: 'lecturer object type' })
export class LecturerSchema {
  @Field((type) => Int)
  id: number;
  @Field((type) => String)
  name: string;
  @Field((type) => String)
  email: string;
  @Field((type) => String)
  gender: 'male' | 'female';
  @Field((type) => LabsSchema)
  lab: LabsSchema;
}
