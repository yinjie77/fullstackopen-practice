const bcrypt=require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  .catch(error=>{
    response.status(400).json({
        error: error.message 
      })
  })

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
  .find({}).populate('blogs',{title:1,author:1,url:1,likes:1})
    response.json(users)
  })
module.exports = usersRouter