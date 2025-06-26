class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(title) {
    let index = this.books.findIndex(book => book.title === title);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  getBooksCount() {
    return this.books.length();
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
      years.add(libs[i][j].years);
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
