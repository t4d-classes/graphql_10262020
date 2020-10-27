import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    message: String
    randomInt: Int
    randomNumber: Float
    isCustomer: Boolean

    authors: [Author]
    author(id: ID): Author
    books(sortField: String): [Book]
    bookById(id: ID): Book
    bookByISBN(isbn: String): Book
  }

  type Mutation {
    appendAuthor(author: NewAuthor): Author
  }

  input NewAuthor {
    firstName: String
    lastName: String
    age: Int
  }

  type Author {
    id: ID
    fullName: String
    firstName: String
    lastName: String
    age: Int
    books: [Book]
  }

  type Book {
    id: ID
    title: String
    isbn: String
    copyrightYear: Int
    price: Float
    authorId: ID
    author: Author
  }
`;
