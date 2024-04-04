/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Class as Course, Trait, Subject, Review } from '@prisma/client';
import { GraphQLFloat } from 'graphql';
import { CourseSchema } from 'src/courses/courses.schema';
import { LabsSchema } from 'src/labs/labs.schema';
import { ReviewSchema } from 'src/reviews/reviews.schema';
import { SubjectsSchema } from 'src/subjects/subjects.schema';
import { TraitSchema } from 'src/traits/traits.schema';

@ObjectType('lecturer')
export class LecturerSchema {
  @Field((type) => Int)
  id: number;
  @Field((type) => String)
  name: string;
  @Field((type) => String)
  email: string;
  @Field((type) => String)
  gender: 'male' | 'female';
  @Field((type) => LabsSchema, { name: 'lab' })
  lab: LabsSchema;
  @Field((type) => [SubjectsSchema])
  subjects: Subject[];
  @Field((type) => GraphQLFloat)
  rating: number;
  @Field((type) => [CourseSchema])
  courses: Course[];
  @Field((type) => [TraitSchema])
  tags: Trait[];
  @Field((type) => [ReviewSchema])
  reviews: Review[];
}
