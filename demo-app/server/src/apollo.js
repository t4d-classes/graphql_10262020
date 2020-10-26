import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

import { Author } from './services/author';
import { Book } from './services/book';

const author = new Author();
const book = new Book();

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
      },
    };
  },
};

export const apollo = new ApolloServer(apolloServerConfig);
