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

  type Author {
    id: ID
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
