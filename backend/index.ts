// import { PrismaClient } from '@prisma/client'
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.$connect()
  console.log("Connected to database!")

  const allUsers = await prisma.user.findMany()
  console.log(allUsers)

  await prisma.$disconnect()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
