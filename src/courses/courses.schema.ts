import { Field, GraphQLTimestamp, ObjectType } from '@nestjs/graphql';
import { Lecturer, Subject } from '@prisma/client';
import { GraphQLInt, GraphQLString } from 'graphql';
import { LecturerSchema } from 'src/lecturers/lecturers.schema';
import { SubjectsSchema } from 'src/subjects/subjects.schema';

@ObjectType('class', {})
export class CourseSchema {
  @Field(() => GraphQLInt)
  id: number;

  @Field(() => GraphQLString)
  semester: string;

  @Field(() => GraphQLTimestamp)
  year: Date;

  @Field(() => GraphQLTimestamp)
  createdAt: Date;

  @Field(() => GraphQLTimestamp)
  updatedAt: Date;

  @Field(() => LecturerSchema)
  lecturer: Lecturer;

  @Field(() => SubjectsSchema)
  subject: Subject;
}
