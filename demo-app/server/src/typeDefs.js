import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    message: String
    randomInt: Int
    randomNumber: Float
    isCustomer: Boolean

    authors: [Author]
  }

  type Author {
    firstName: String
    lastName: String
    age: Int
  }
`;
