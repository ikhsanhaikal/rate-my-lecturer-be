import { Injectable } from '@nestjs/common';
import { Lab } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LabsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<Lab | null> {
    return this.prisma.lab.findFirst({ where: { id: id } });
  }
}
