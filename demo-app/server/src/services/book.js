export class Book {
  constructor() {
    this._books = [
      {
        id: 1,
        title: 'Book A',
        isbn: 'AAA111AAA111',
        copyrightYear: 2020,
        price: 25.44,
        authorId: 1,
      },
      {
        id: 2,
        title: 'Book B',
        isbn: 'BBB222BBB222',
        copyrightYear: 2019,
        price: 15.84,
        authorId: 1,
      },
      {
        id: 3,
        title: 'Book C',
        isbn: 'CCC333CCC333',
        copyrightYear: 2018,
        price: 65.94,
        authorId: 3,
      },
    ];
  }

  all(options) {
    // returning a copy of the array

    const books = [...this._books];

    if (options?.sortField) {
      books.sort((a, b) => {
        if (a[options.sortField] < b[options.sortField]) {
          return -1;
        } else if (a[options.sortField] > b[options.sortField]) {
          return 1;
        } else {
          return 0;
        }
      });

      return books;
    }

    return [...this._books];
  }

  oneById(bookId) {
    // return the first book object with the matching id
    return this._books.find((b) => b.id === bookId);
  }

  oneByISBN(bookISBN) {
    // return the first book object with the matching id
    return this._books.find((b) => b.isbn === bookISBN);
  }

  append(book) {
    const newBook = {
      ...book,
      // find the max book id in the array, then add 1 to it
      id: Math.max(...this._books.map((a) => a.id), 0) + 1,
    };

    this._books = [...this._books, newBook];

    return newBook;
  }

  attachAuthor(bookId, authorId) {
    const bookIndex = this._books.findIndex((b) => b.id === bookId);

    const updatedBook = {
      ...this._books[bookIndex],
      authorId,
    };

    const newBooks = [...this._books];

    newBooks[bookIndex] = updatedBook;

    this._books = newBooks;

    return updatedBook;
  }
}
