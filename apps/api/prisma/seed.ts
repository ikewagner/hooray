import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  await prisma.organization.deleteMany()
  await prisma.user.deleteMany()
  await prisma.compliment.deleteMany()

  const passwordHash = await hash('123456', 1)

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@acme.com',
      avatarUrl: 'https://github.com/diego3g.png',
      passwordHash,
    },
  })

  const anotherUser = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Acme Inc (Admin)',
      domain: 'acme.com',
      slug: 'acme-admin',
      avatarUrl: faker.image.avatarGitHub(),
      shouldAttachUsersByDomain: true,
      ownerId: user.id,
      compliments: {
        createMany: {
          data: [
            {
              title: 'Elogio',
              content: faker.lorem.words(5),
              ownerId: faker.helpers.arrayElement([user.id]),
              receiverId: anotherUser.id,
            },
            {
              title: 'Elogio',
              content: faker.lorem.words(5),
              ownerId: faker.helpers.arrayElement([anotherUser.id]),
              receiverId: user.id,
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'ADMIN',
            },
            {
              userId: anotherUser.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })
}
seed().then(() => {
  console.log('Database seeded!')
})
