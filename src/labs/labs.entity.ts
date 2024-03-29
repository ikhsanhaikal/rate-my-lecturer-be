import { Lecturer } from 'src/lecturers/lecturers.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'labs' })
export class Lab {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  code: string;
  @Column()
  createdAt: string;
  //@Column()
  //updatedAt: string;

  @OneToMany(() => Lecturer, (lecturer) => lecturer.lab)
  members: Lecturer[];
}
