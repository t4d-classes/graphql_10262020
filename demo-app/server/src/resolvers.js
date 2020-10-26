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
    authors(_1, _2, context) {
      return context.data.author.all();
    },
    author(_, args, context) {
      return context.data.author.oneById(Number(args.id));
    },
    books(_1, args, context) {
      return context.data.book
        .all({ sortField: args.sortField })
        .map((book) => {
          return {
            ...book, // make a copy of the book object into a new object
            author: context.data.author.oneById(book.authorId),
          };
        });
    },
    bookById(_, args, context) {
      return context.data.book.oneById(Number(args.id));
    },
    bookByISBN(_, args, context) {
      return context.data.book.oneByISBN(args.isbn);
    },
  },
};
