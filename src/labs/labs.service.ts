import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lab } from './labs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LabsService {
  constructor(
    @InjectRepository(Lab)
    private labRepository: Repository<Lab>,
  ) {}

  async findOne(id: number): Promise<Lab | null> {
    return this.labRepository.findOne({ where: { id: id } });
  }
}
