const mongoose = require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const bookSchema = new mongoose.Schema({
  name:{type:String,required:true,unique:true,minlength:3},
  number:{type:String,required:true,unique:true,minlength:8}
})
bookSchema.plugin(uniqueValidator)
bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Book', bookSchema)