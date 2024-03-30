import { Lecturer } from 'src/lecturers/lecturers.entity';
import { Subject } from 'src/subjects/subjects.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum Semester {
  GENAP = 'genap',
  GANJIL = 'ganjil',
}
@Entity({ name: 'clasess' }) // should be classes
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'enum',
    enum: Semester,
    nullable: true,
  })
  semester: string;
  @Column({
    nullable: true,
  })
  year: Date;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  subjectId: number;

  @ManyToOne(() => Subject, (subject) => subject.subjectAndLecturer)
  @JoinColumn()
  public subject: Subject;

  @Column({ nullable: true })
  lecturerId: number;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.subjectAndLecturer)
  @JoinColumn()
  public lecturer: Lecturer;
}
