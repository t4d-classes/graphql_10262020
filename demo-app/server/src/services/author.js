export class Author {
  constructor() {
    this._authors = [
      { id: 1, firstName: 'Grace', lastName: 'Greene', age: 20 },
      { id: 2, firstName: 'Bob', lastName: 'Smith', age: 32 },
      { id: 3, firstName: 'Sally', lastName: 'Thompkins', age: 45 },
    ];
  }

  all() {
    // returning a copy of the array
    return [...this._authors];
  }

  oneById(authorId) {
    // return the first author object with the matching id
    return this._authors.find((a) => a.id === authorId);
  }
}
