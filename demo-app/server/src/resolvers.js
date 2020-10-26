// import { PubSub } from 'apollo-server-express';
// import fetch from 'node-fetch';

// const pubSub = new PubSub();

export const resolvers = {
  Query: {
    message() {
      return 'Welcome to React and Apollo with Next.js!';
    },
    randomInt() {
      return Math.floor(Math.random() * 1000);
    },
    randomNumber() {
      return Math.random() * 1000;
    },
    isCustomer() {
      return true;
    },
    authors() {
      return [
        { firstName: 'Grace', lastName: 'Greene', age: 20 },
        { firstName: 'Bob', lastName: 'Smith', age: 32 },
        { firstName: 'Sally', lastName: 'Thompkins', age: 45 },
      ];
    },
  },
};
