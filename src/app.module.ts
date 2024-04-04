import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { LecturersModule } from './lecturers/lecturers.module';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';
import { SubjectModule } from './subjects/subjects.module';
import { LabsModule } from './labs/labs.module';
import { PrismaModule } from './prisma/prisma.module';
import { TraitsModule } from './traits/traits.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    LabsModule,
    LecturersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      include: [
        LabsModule,
        LecturersModule,
        SubjectModule,
        CoursesModule,
        ReviewsModule,
        TraitsModule,
      ],
      autoSchemaFile: true,
    }),
    CoursesModule,
    SubjectModule,
    PrismaModule,
    TraitsModule,
    ReviewsModule,
    UsersModule,
  ],
})
export class AppModule {}
