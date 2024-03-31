import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Subject } from '@prisma/client';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  async subjects(): Promise<Subject[]> {
    return this.prisma.subject.findMany({});
  }
  async subject(id: number): Promise<Subject> {
    return this.prisma.subject.findFirst({ where: { id: id } });
  }
}
