import { ApolloError, PubSub } from 'apollo-server-express';
// import fetch from 'node-fetch';

const AUTHOR_APPENDED = 'AUTHOR_APPENDED';
const AUTHOR_REMOVED = 'AUTHOR_REMOVED';
const BOOK_AUTHOR_CHANGED = 'BOOK_AUTHOR_CHANGED';

const pubSub = new PubSub();

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
    employees(_1, _2, context) {
      return context.data.employee.all();
    },
    employee(_, args, context) {
      const employee = context.data.employee.oneBySSN(args.ssn);

      if (!employee) {
        return new ApolloError('Unable to find employee');
      }

      return employee;
    },
    contacts(_1, _2, context) {
      return [...context.data.employee.all(), ...context.data.vendor.all()];
    },
    people(_1, _2, context) {
      return [...context.data.employee.all(), ...context.data.vendor.all()];
    },
  },
  Contact: {
    __resolveType: (obj) => {
      if (obj.hasOwnProperty('ssn')) {
        return 'Employee';
      }
      if (obj.hasOwnProperty('ein')) {
        return 'Vendor';
      }
      return null;
    },
  },
  People: {
    __resolveType: (obj) => {
      if (obj.hasOwnProperty('ssn')) {
        return 'Employee';
      }
      if (obj.hasOwnProperty('ein')) {
        return 'Vendor';
      }
      return null;
    },
  },
  Mutation: {
    appendAuthor(_, args, context) {
      const author = context.data.author.append(args.author);
      pubSub.publish(AUTHOR_APPENDED, { authorAppended: author });
      return author;
    },
    removeAuthor(_, args, context) {
      const author = context.data.author.remove(Number(args.authorId));
      pubSub.publish(AUTHOR_REMOVED, { authorRemoved: author.id });
      return author;
    },
    appendBook(_, args, context) {
      const book = context.data.book.append({
        ...args.book,
        authorId: Number(args.book.authorId),
      });
      pubSub.publish(BOOK_AUTHOR_CHANGED, {
        bookAuthorChanged: {
          book: book,
          originalAuthor: null,
          newAuthor: context.data.author.oneById(book.authorId),
        },
      });
      return book;
    },
    appendEmployee(_, args, context) {
      return context.data.employee.append(args.employee);
    },
    removeEmployee(_, args, context) {
      return context.data.employee.remove(Number(args.employeeId));
    },
    attachAuthorToBook(_, args, context) {
      const originalBook = context.data.book.oneById(Number(args.bookId));

      const updatedBook = context.data.book.attachAuthor(
        Number(args.bookId),
        Number(args.authorId),
      );

      if (originalBook.authorId !== updatedBook.authorId) {
        pubSub.publish(BOOK_AUTHOR_CHANGED, {
          bookAuthorChanged: {
            book: updatedBook,
            originalAuthor: context.data.author.oneById(originalBook.authorId),
            newAuthor: context.data.author.oneById(updatedBook.authorId),
          },
        });
      }

      return updatedBook;
    },
  },
  Subscription: {
    authorAppended: {
      subscribe() {
        return pubSub.asyncIterator([AUTHOR_APPENDED]);
      },
    },
    authorRemoved: {
      subscribe() {
        return pubSub.asyncIterator([AUTHOR_REMOVED]);
      },
    },
    bookAuthorChanged: {
      subscribe() {
        return pubSub.asyncIterator([BOOK_AUTHOR_CHANGED]);
      },
    },
  },
};
