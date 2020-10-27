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
    bookById(id: ID!): Book
    bookByISBN(isbn: String!): Book
    employees: [Employee]
    employee(ssn: String!): Employee
    vendors: [Vendor]
  }

  type Mutation {
    appendAuthor(author: NewAuthor!): Author
    appendBook(book: NewBook!): Book
    attachAuthorToBook(authorId: ID!, bookId: ID!): Book
    appendEmployee(employee: NewEmployee!): Employee
    removeEmployee(employeeId: ID!): Employee
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

  input NewBook {
    title: String
    isbn: String
    copyrightYear: Int
    price: Float
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

  input NewEmployee {
    firstName: String
    lastName: String
    ssn: String
  }

  type Employee {
    id: ID
    firstName: String
    lastName: String
    ssn: String
  }

  type Vendor {
    id: ID
    firstName: String
    lastName: String
    companyName: String
    ein: String
  }
`;
