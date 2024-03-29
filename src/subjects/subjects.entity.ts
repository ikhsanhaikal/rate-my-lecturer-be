import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'subjects' })
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
