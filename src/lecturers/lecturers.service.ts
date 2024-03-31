import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Lecturer, Prisma } from '@prisma/client';

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
}
