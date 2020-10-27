// import { PubSub } from 'apollo-server-express';
// import fetch from 'node-fetch';

// const pubSub = new PubSub();

export const resolvers = {
  Author: {
    // default implementation if the field is not defined on the resolver
    firstName(author) {
      return author.firstName;
    },
    fullName(author) {
      return author.firstName + ' ' + author.lastName;
    },
    books(author, _, context) {
      return context.data.book
        .all()
        .filter((book) => book.authorId === author.id);
    },
  },
  Book: {
    author(book, _, context) {
      return context.data.author.oneById(book.authorId);
    },
  },
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
      return context.data.book.all({ sortField: args.sortField });
    },
    bookById(_, args, context) {
      return context.data.book.oneById(Number(args.id));
    },
    bookByISBN(_, args, context) {
      return context.data.book.oneByISBN(args.isbn);
    },
  },
  Mutation: {
    appendAuthor(_, args, context) {
      return context.data.author.appendAuthor(args.author);
    },
  },
};
