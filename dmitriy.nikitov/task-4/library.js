export class Library {
  constructor(name) {
    if (typeof name !== "string") {
      throw new Error("Name of the library is not a string.");
    }
    this.name = name;
    this.books = [];
  }

  getBooksCount() {
    return this.books.length;
  }

  addBook(book) {
    if (typeof book !== "object" || book === null || !book.hasOwnProperty("title") ||
      !book.hasOwnProperty("author") || !book.hasOwnProperty("year") || !book.hasOwnProperty("genre")) {
      throw new Error("The book does not contain all the necessary fields.");
    }
    if (this.books.some(existingBook => existingBook.title === book.title)) {
      throw new Error("A book with that title already exists.");
    }
    this.books.push(book);
  }

  removeBook(title) {
    if (!this.books.find(book => book.title === title)) {
      throw new Error("A book with that title does not exists.");
    }
    this.books = this.books.filter(book => book.title !== title);
  }

  toJSON() {
    return {
      name: this.name,
      books: this.books
    };
  }

  static fromJSON(json) {
    const library = new Library(json.name);
    library.books = json.books || [];
    return library;
  }
}

function groupByProperty(libs, property) {
  const map = new Map();
  libs.forEach(library => {
    library.books.forEach(book => {
      const key = book[property];
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(book);
    });
  });
  return map;
}

function groupByGenre(libs) {
  return groupByProperty(libs, 'genre');
}

function groupByYear(libs) {
  return groupByProperty(libs, 'year');
}

function getUniqueValues(libs, property) {
  const values = new Set();
  libs.forEach(library => {
    library.books.forEach(book => {
      values.add(book[property]);
    });
  });
  return Array.from(values);
}

function getAuthors(libs) {
  return getUniqueValues(libs, 'author');
}

function getYears(libs) {
  return getUniqueValues(libs, 'year');
}

function getBooksByAuthor(libs, author) {
  const books = new Set();
  libs.forEach(library => {
    library.books.forEach(book => {
      if (book.author === author) {
        books.add(book);
      }
    });
  });
  return Array.from(books);
}
