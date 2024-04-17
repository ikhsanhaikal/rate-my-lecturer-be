import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Class as Course,
  Lecturer,
  Prisma,
  Review,
  Subject,
  Trait,
} from '@prisma/client';
import { SearchResult } from './lecturers.resolver';

@Injectable()
export class LecturersService {
  constructor(private prisma: PrismaService) {}

  async lecturer(id: number): Promise<Lecturer | null> {
    return this.prisma.lecturer.findFirst({ where: { id: id } });
  }
  async lecturers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LecturerWhereUniqueInput;
    where?: Prisma.LecturerWhereInput;
    orderBy?: Prisma.LecturerOrderByWithRelationInput;
  }): Promise<Lecturer[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.lecturer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  async courses(id: number): Promise<Course[]> {
    const result = await this.prisma.class.findMany({
      where: { lecturerId: id },
    });
    console.log(`courses: `, result);
    return result;
  }

  async searchByName(
    limit: number,
    cursorId: number,
    name: string,
    count: boolean,
    skip?: number,
  ): Promise<SearchResult> {
    const data = await this.prisma.lecturer.findMany({
      take: limit,
      skip: skip,
      cursor: cursorId
        ? {
            id: cursorId,
          }
        : undefined,
      where: {
        name: { contains: name },
      },
    });
    const total = count
      ? await this.prisma.lecturer.count({
          where: {
            name: { contains: name },
          },
        })
      : -1;

    return { data, total };
  }

  async subjects(id: number): Promise<Subject[]> {
    const result = await this.prisma.class.findMany({
      distinct: ['subjectId'],
      select: {
        subject: true,
      },
      where: { lecturerId: id },
    });
    const tmp = result.map((r) => r.subject);
    console.log(`subjects: `, tmp);
    return tmp;
  }
  async rating(id: number): Promise<number> {
    const result = await this.prisma.review.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        class: {
          lecturerId: id,
        },
      },
    });
    console.log(`rating: `, result._avg.rating ?? 0);
    return result._avg.rating ?? 0;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async tags(lecturerId: number): Promise<Trait[]> {
    const result = await this.prisma.tag.findMany({
      distinct: ['traitId'],
      include: {
        trait: true,
      },
      where: {
        review: {
          class: {
            lecturerId: lecturerId,
          },
        },
      },
    });

    const tmp = result.map((r) => r.trait);
    console.log('tags: ', result);
    console.log('tags: ', tmp);
    return tmp;
  }
  async reviews(lecturerId: number): Promise<Review[]> {
    const result = await this.prisma.review.findMany({
      where: {
        class: {
          lecturerId: lecturerId,
        },
      },
    });
    return result;
  }
}
