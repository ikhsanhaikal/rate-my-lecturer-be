import { Lab } from 'src/labs/labs.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'lecturers' })
export class Lecturer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  gender: 'female' | 'male';

  @ManyToOne(() => Lab, (lab) => lab.members)
  lab: Lab;
}
