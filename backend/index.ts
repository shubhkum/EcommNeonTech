const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
dotenv.config();
const {faker}  = require('@faker-js/faker')
const  express = require('express')
const app = express()
app.use(express.json())
const response = require('./utils/responses.js')
const generateOTP = require('./utils/otp-generator.js')
const {sendEmail} = require('./utils/nodemailer.js')
console.log(response,generateOTP,sendEmail,'response');

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()  
  res.json(users)
})
app.get('/categories', async (req, res) => {
  try{
    const categories = await prisma.category.findMany()  
    if (!categories) {
      return response(res, 500 , {message: 'No category found'})
    }
    return response(res, 200 , {message: 'All categories fetched',categories:categories})

  } catch (error) {
    return response(res, 500 , {message: error.message})
  }
})

app.post(`/user`, async (req, res) => {
    try{
      const otp = generateOTP()
      const salt = await bcrypt.genSalt(10); 
      const {password} = req.body
      const hashedPassword = await bcrypt.hash(password, salt);
      const result = await prisma.user.create({
        data: { ...req.body, password:hashedPassword, otp:otp },
        select: { id: true, email: true, name: true} 
      })
      if (!result) {
        return response(res, 500 , {message: 'User was not registered'})
      }
      const {email} = req.body
      sendEmail(email, 'Your OTP', `Your OTP is: ${otp}`)
      return response(res, 200, {message: 'User registered successfully', user: result})
    } catch(error) {
      return response(res, 500 , {message: error.message})
    }
})

app.post(`/verifyEmail`, async (req,res) => {
  try{
    const {email, otp} = req.body
    const user = await prisma.user.findUnique({
      where: { email },
    }); 
    if (!user) {
      return response(res, 400, { message: 'Invalid email or OTP' });
    }
    if (user.otp !== otp) {
      return response(res, 400, { message: 'Invalid email or OTP' });
    }
    const updateUser = await prisma.user.update({
      where: { email },
      data: { otp: null, isVerified: true },
      select: { id: true, email: true, name: true}
    });
    return response(res, 200, { message: 'Email verification successful', user: updateUser });
  } catch (error) {
}
})
app.post(`/verifyUser`, async (req,res) => {
  try{
    const {email, password} = req.body
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        selectedCategories: true,
      },
    }); 
    if (!user) {
      return response(res, 400, { message: 'Invalid email' });
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return response(res, 400, { message: 'Wrong password' });
    }
    const updateUser = await prisma.user.findUnique({
      where: {email},
      select: { id: true, email: true, name: true, isVerified: true, selectedCategories: true} 
  });
    return response(res, 200, { message: 'Logged in successfully', user: updateUser });
  } catch (error) {
}
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
