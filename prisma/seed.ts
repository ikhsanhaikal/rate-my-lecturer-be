import { Gender, Lab, LabCode, PrismaClient, Subject } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { labs, subjects } from './dummy-data';
const prisma = new PrismaClient();

async function main() {
  await seedSubjects();
  await lecturers();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
function seedSubjects() {
  return subjects.map(async (subject) => {
    return prisma.subject.upsert({
      where: { name: subject },
      update: {},
      create: {
        name: subject,
      },
    });
  });
}
function seedLabs() {
  return labs.map(async (lab) => {
    return prisma.lab.upsert({
      where: { code: lab.code as LabCode },
      update: {},
      create: {
        name: lab.name,
        code: lab.code as LabCode,
      },
    });
  });
}
async function lecturers() {
  const resultLabs: Array<Lab> = await Promise.all(seedLabs());
  const resultSubjects: Array<Subject> = await Promise.all(seedSubjects());
  const req = new Array(30).fill(0).map(async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({
      firstName: firstName,
      lastName: lastName,
    });
    return prisma.lecturer.upsert({
      where: { email: email },
      update: {},
      create: {
        email: email,
        name: `${firstName} ${lastName}`,
        gender: faker.person.sex().toUpperCase() as Gender,
        description: faker.lorem.sentence(),
        lab: {
          connect: resultLabs[faker.number.int({ max: resultLabs.length - 1 })],
        },
        courses: {
          createMany: {
            skipDuplicates: true,
            data: new Array(3).fill(0).map(() => {
              return {
                subjectId:
                  resultSubjects[
                    faker.number.int({ max: resultSubjects.length - 1 })
                  ].id,
              };
            }),
          },
        },
      },
    });
  });
  await Promise.all(req);
}