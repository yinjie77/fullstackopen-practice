const { ApolloServer, gql,UserInputError } = require('apollo-server')
// const {v1:uuid} =require('uuid')
const mongoose=require('mongoose')
const Book =require('./model/Book')
const Author=require('./model/Author')
const User=require('./model/User')
const jwt=require('jsonwebtoken')
const JWT_SECRET='yinjie77'
const MONGODB_URI='mongodb+srv://yinjie77:hyj200177@cluster0.tern7.mongodb.net/library?retryWrites=true&w=majority'
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

const typeDefs = gql`
type User{
  username:String!
  favoriteGenre: String!
  id: ID!
}
type Token{
  value:String!
}

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}
type Author {
  name: String!
  id: ID!
  born: Int
  bookCount: Int
}

  type Query {
      bookCount:Int!
      authorCount:Int!
      allBooks(author:String genre:String):[Book!]!
      allAuthors:[Author!]!
      me:User
  }

  type Mutation{
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
      editAuthor(
          name:String!
          setBornTo:Int!
      ):Author
    createUser(
      username:String!
      favoriteGenre: String!
    ):User
    login(
      username:String!
      password:String!
    ):Token
  }
`

const resolvers = {
  Query: {
      bookCount:()=>Book.collection.countDocuments(),
      authorCount:()=>Author.collection.countDocuments(),
      allBooks:async(root,args)=>{
        if (!args.author && !args.genre) {
          return Book.find({}).populate('author')
        }
  
        let books = await Book.find({}).populate('author')
        if (args.author)
          books = books.filter((book) => book.author.name === args.author)
  
        if (args.genre) {
          books = books.filter(
            (book) => book.genres.findIndex((genre) => genre == args.genre) !== -1
          )
        }
        return books
        
      },
      allAuthors:async()=>{
        const authors = await Author.find({})
      const books = await Book.find({}).populate('author')
      return authors.map((author) => {
        const bookCount = books.reduce(
          (a, book) => (book.author.name == author.name ? a + 1 : a),
          0
        )
        return {
          name: author.name,
          id: author._id,
          born: author.born,
          bookCount
        }
      })
      
      },
      me: (root, args, { currentUser }) => currentUser
  },
  Mutation:{
        addBook:async(root,args,{currentUser})=>{
          if (!currentUser) {
            throw new AuthenticationError('not authenticated')
          }

          const authors = await Author.find({})
      if (!authors.find((author) => author.name === args.author)) {
        let newAuthor = new Author({ name: args.author })

        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }

      const newAuthor = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, author: newAuthor })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return book
  },
        editAuthor:async(root,args,{currentUser})=>{
          if (!currentUser) {
            throw new AuthenticationError('not authenticated')
          }
          if (!args.name) {
            throw new UserInputError('No name field', {
              invalidArgs: args
            })
          }
          const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      return author.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })

        },
        createUser:(root,args)=>{
          if (!args.username || !args.favoriteGenre) {
            throw new UserInputError('username or favoriteGenre is missing', {
              invalidArgs: args
            })
          }
          const user = new User({
            username: args.username,
            favoriteGenre: args.favoriteGenre
          })
          return user.save().catch((error) => {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          })
        },
        login:async(root,args)=>{
          if (!args.username || !args.password) {
            throw new UserInputError('username or password is missing', {
              invalidArgs: args
            })
          }
          const user = await User.findOne({ username: args.username })
      if (!user || args.password !== '123456') {
        throw new UserInputError('invalid credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodeToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findOne({ username: decodeToken.username })
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})