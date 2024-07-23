const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const dotenv = require('dotenv')

dotenv.config();
async function main() {
  await prisma.$connect()
  console.log("Connected to database!")

  const newUser = await prisma.user.create({
    data: {
      name: 'Shubham',
      email: 'shubham460kumar@gmail.com',
      password: 'geometry',
      otp: '222222',
      selectedCategories: {
        create: {
          name: 'Shoes',
        },
      },
    },
  })
  console.log('Created new user: ', newUser)

  const allUsers = await prisma.user.findMany()
  console.log('All users: ')
  console.dir(allUsers, { depth: null })

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
