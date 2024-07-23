const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const dotenv = require('dotenv')
dotenv.config();
const {faker}  = require('@faker-js/faker')
const  express = require('express')
const app = express()
app.use(express.json())

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()  
  res.json(users)
})
app.get('/categories', async (req, res) => {
  const categories = await prisma.category.findMany()  
  res.json(categories)
})

app.post(`/user`, async (req, res) => {
  const result = await prisma.user.create({
    data: { ...req.body },
  })
  res.json(result)
})

app.get(`/user/:id`, async (req, res) => {
  const {id} = req.params
  const result = await prisma.user.findUnique({
    where: { id: Number(id) },
  })
  res.json(result)
})

//To update the selected category into user table
app.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { selectedCategories } = req.body; 

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { selectedCategories: { set: selectedCategories.map(categoryId => ({ id: categoryId })) } },
      include: {
        selectedCategories: true
      }}
    );
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
});

app.listen(8000, () =>
  console.log('REST API server ready at: http://localhost:8000'),
)
