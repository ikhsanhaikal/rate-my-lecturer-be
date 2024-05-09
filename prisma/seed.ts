import { Gender, Lab, User, PrismaClient, Subject } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { labs, subjects, traits } from './dummy-data';
const prisma = new PrismaClient();

async function main() {
  const users = await seedUsers();
  await seedTraits();
  await seedLecturers();
  seedReviews(users);
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

async function seedTraits() {
  const foo = traits.map(async (trait) => {
    return prisma.trait.upsert({
      where: { name: trait },
      update: {},
      create: {
        name: trait,
      },
    });
  });
  return await Promise.all(foo);
}
function seedSubjects(editor: any) {
  return subjects.map(async (subject) => {
    return prisma.subject.upsert({
      where: { name: subject },
      update: {},
      create: {
        name: subject,
        editor: {
          connect: {
            id: editor.id,
          },
        },
      },
    });
  });
}
function seedLabs(editor: any) {
  return labs.map(async (lab) => {
    return prisma.lab.upsert({
      where: { code: lab.code },
      update: {},
      create: {
        name: lab.name,
        code: lab.code,
        editor: {
          connect: {
            id: editor.id,
          },
        },
      },
    });
  });
}
async function seedUsers() {
  const req = new Array(10).fill(0).map(async () => {
    const sex = faker.person.sex();
    const firstName = faker.person.firstName(sex as 'female' | 'male');
    const lastName = faker.person.lastName(sex as 'female' | 'male');
    const email = faker.internet.email({
      firstName: firstName,
      lastName: lastName,
    });
    return prisma.user.upsert({
      where: { email: email },
      update: {},
      create: {
        email: email,
        username: `${firstName} ${lastName}`,
      },
    });
  });
  const users = await Promise.all(req);
  return users;
}

async function seedLecturers() {
  const editor = await prisma.editor.upsert({
    where: { email: 'ikhsanhoehoe@gmail.com' },
    update: {},
    create: {
      email: 'ikhsanhoehoe@gmail.com',
      username: 'ikhsan haikal',
    },
  });
  const resultLabs: Array<Lab> = await Promise.all(seedLabs(editor));
  const resultSubjects: Array<Subject> = await Promise.all(
    seedSubjects(editor),
  );

  const req = new Array(30).fill(0).map(async () => {
    const sex = faker.person.sex();
    const firstName = faker.person.firstName(sex as 'female' | 'male');
    const lastName = faker.person.lastName(sex as 'female' | 'male');
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
        gender: sex.toUpperCase() as Gender,
        description: faker.lorem.sentence(),
        editor: {
          connect: {
            id: editor.id,
          },
        },
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
                semester: 'GENAP',
                year: faker.date.between({
                  from: '2015-01-01T00:00:00.000Z',
                  to: '2024-01-01T00:00:00.000Z',
                }),
                editorId: editor.id,
              };
            }),
          },
        },
      },
    });
  });
  await Promise.all(req);
}

async function seedReviews(users: User[]) {
  const courses = await prisma.class.findMany({});

  const req1 = courses.map(async (course) => {
    return prisma.review.createMany({
      skipDuplicates: true,
      data: new Array(faker.number.int(5)).fill(0).map(() => ({
        comment: faker.lorem.lines(),
        rating: faker.number.float() * 5,
        classId: course.id,
        reviewerId: users[faker.number.int(users.length - 1)].id,
      })),
    });
  });

  await Promise.all(req1);
  const traits = await prisma.trait.findMany({});
  const reviews = await prisma.review.findMany({});

  const req2 = reviews.map(async (review) => {
    return prisma.tag.createMany({
      skipDuplicates: true,
      data: new Array(faker.number.int(3)).fill(0).map(() => ({
        traitId: traits.at(faker.number.int(traits.length - 1)).id,
        reviewId: review.id,
      })),
    });
  });

  await Promise.all(req2);
}
