import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { id: id } });
  }
}
