import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { LecturersModule } from './lecturers/lecturers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabsModule } from './labs/labs.module';
import { Lecturer } from './lecturers/lecturers.entity';
import { Lab } from './labs/labs.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          database: configService.get('DB_DATABASE'),
          entities: [Lecturer, Lab],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
    LabsModule,
    LecturersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      include: [LabsModule, LecturersModule],
      autoSchemaFile: true,
    }),
  ],
})
export class AppModule {}
