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

function groupByGenre(libs) {
  let map = new Map();
  for (let i = 0; i !== libs.length(); ++i) {
    for (let j = 0; j !== libs[i].length(); ++j) {
      if (!map.has(libs[i][j].genre)) {
        map.set(libs[i][j].genre, []);
      }
      map.get(libs[i][j].genre).push(libs[i][j]);
    }
  }
}

function groupByYear(libs) {
  let map = new Map();
  for (let i = 0; i !== libs.length(); ++i) {
    for (let j = 0; j !== libs[i].length(); ++j) {
      if (!map.has(libs[i][j].year)) {
        map.set(libs[i][j].year, []);
      }
      map.get(libs[i][j].year).push(libs[i][j]);
    }
  }
}

function getAuthors(libs) {
  let authors = new Set();
  for (let i = 0; i !== libs.length(); ++i) {
    for (let j = 0; j !== libs[i].length(); ++j) {
      authors.add(libs[i][j].author);
    }
  }
  return Array.from(authors);
}

function getYears(libs) {
  let years = new Set();
  for (let i = 0; i !== libs.length(); ++i) {
    for (let j = 0; j !== libs[i].length(); ++j) {
      years.add(libs[i][j].year);
    }
  }
  return Array.from(years);
}

function getBooksByAuthor(libs, author) {
  let books = new Set();
  for (let i = 0; i !== libs.length(); ++i) {
    for (let j = 0; j !== libs[i].length(); ++j) {
      if (libs[i][j].author == author) {
        books.add(libs[i][j]);
      }
    }
  }
  return Array.from(books);
}
