import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Class as Course } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async coursesByLecturer(lecturerId: number): Promise<Course[]> {
    const result = await this.prisma.class.findMany({
      where: { lecturerId: lecturerId },
    });
    return result;
  }
}
