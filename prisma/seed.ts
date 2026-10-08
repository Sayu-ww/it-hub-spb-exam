import { PrismaClient } from '../src/generated/prisma/client.js'
import { getDatabaseUrl } from '../src/database-url.js'
import { hashPassword } from '#/lib/hash.js'

import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: getDatabaseUrl(),
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  await prisma.review.deleteMany()
  await prisma.application.deleteMany()
  await prisma.user.deleteMany()

  const adminPassword = await hashPassword('KorokNET')
  const userPassword = await hashPassword('testuser')

  const users = await prisma.user.createMany({
    data: [
      {
        email: 'admin@example.com',
        login: 'Admin',
        phone: '8(922)344-91-23',
        fullname: 'Админ Админович',
        password: adminPassword,
        role: 'ADMIN',
      },
      {
        email: 'testuser@example.com',
        login: 'testuser',
        phone: '8(912)345-67-89',
        fullname: 'Юзер Юзерович',
        password: userPassword,
        role: 'USER',
      },
    ],
  })

  console.log(`✅ Created ${users.count} users`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
