import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecturer } from './lecturers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LecturersService {
  constructor(
    @InjectRepository(Lecturer)
    private lecturersRepository: Repository<Lecturer>,
  ) {}

  async findOne(id: number): Promise<Lecturer | null> {
    console.log(`id given ${id}`);
    try {
      const lecturer = await this.lecturersRepository.findOne({
        where: { id: id },
      });
      return lecturer;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
