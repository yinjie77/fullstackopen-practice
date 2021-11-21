require('dotenv').config()
const Book=require('./models/book')
const express=require('express')
const app=express()
const morgan=require('morgan')

app.use(express.static('build'))
app.use(express.json())
morgan.token('post', function (req){
	if(req.method === 'POST')
		return JSON.stringify(req.body)
	else
		return ''
})
morgan.format('yinjie',':method :url :status :res[content-length] - :response-time ms :post')
const cors=require('cors')
app.use(cors())


app.use(morgan('yinjie'))
let persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(request,response)=>{
    Book.find({}).then(books=>{
        response.json(books)
    })
})
app.get('/info',(request,response)=>{

    const date=new Date()
     Book.find({}).then(books=>{
        response.send(`<p>Phonebook has info for ${books.length} people</p> <p>${date}</p>`)
     })
   
})
app.get('/api/persons/:id',(request,response,next)=>{
  Book.findById(request.params.id)
  .then(book=>{
      if(note)
      {
        response.json(book)
      }
      else
      {
          response.status(404).end()
      }
  })
  .catch(error=>next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const book = {
      name: body.name,
      number: body.number,
    }
  
    Book.findByIdAndUpdate(request.params.id, book, { new: true })
      .then(updatedBook => {
        response.json(updatedBook)
      })
      .catch(error => next(error))
  })

app.delete('/api/persons/:id',(request,response,next)=>{
    Book.findByIdAndRemove(request.params.id)
    .then(r=>{
        response.status(204).end()
    })
    .catch(error=>next(error))
})
const createId=()=>{
    return Math.floor(Math.random()*10000)
}
app.post('/api/persons',(request,response,next)=>{
    const body = request.body
    if(body.name === undefined)
    return response.status(400).json({eror:'content missing'})

    const book=new Book({
        name:body.name,
        number:body.number
    })

    book.save()
    .then(saveBook=>{
        response.json(saveBook)
    })
    .catch(error=>next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }

    next(error)
  }
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
