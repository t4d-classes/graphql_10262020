import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

import { Author } from './services/author';
import { Book } from './services/book';
import { Employee } from './services/employee';
import { Vendor } from './services/vendor';

const author = new Author();
const book = new Book();
const employee = new Employee();
const vendor = new Vendor();

const apolloServerConfig = {
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    return {
      req,
      res,
      restUrl: process.env.REST_URL,
      data: {
        author,
        book,
        employee,
        vendor,
      },
    };
  },
};

export const apollo = new ApolloServer(apolloServerConfig);
