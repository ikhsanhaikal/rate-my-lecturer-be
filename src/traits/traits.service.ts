import { Injectable } from '@nestjs/common';
import { Trait } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TraitService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Trait[]> {
    return this.prisma.trait.findMany({});
  }
}
