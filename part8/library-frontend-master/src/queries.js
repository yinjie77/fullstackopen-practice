import {gql} from '@apollo/client'
export const AUTHORS=gql`
query Query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const BOOKS=gql`
query Query {
  allBooks {
    title
    published
    author {
      name
      born
      bookCount
    }
    genres
  }
}
`
export const ADDBOOK=gql`
mutation Mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    published
    author {
      name
      born
      bookCount
    }
    genres
  }
}
`
export const EDIT_BRON=gql`
mutation Mutation($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
    bookCount
  }
}
`
export const LOGIN=gql`
mutation ValueMutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`
export const USER=gql`
query Query {
  me {
    username
    favoriteGenre
  }
}
`
export const BOOKS_WITH_GENRE=gql`
query Query($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    author {
      name
    }
  }
}
`