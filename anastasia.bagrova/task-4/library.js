'use strict';

class Library{
    name;
    #books;

    constructor(name, books = []){
        if (typeof name !== 'string' || name.trim() === ''){
            throw new Error('Название библиотеки должно быть строкой, содержащей хотя бы 1 символ');
        }
        if (name.length > 50){
            throw new Error('Название библиотеки не должно превышать 50 символов');
        }
        if (!Array.isArray(books)){
            throw new Error('При создании билиотеки книги должны быть переданы в виде массива');
        }

        name = name.trim();
        this.name = name[0].toUpperCase() + name.slice(1);
        this.#books = [];
        books.forEach((book) => this.addBook(book));
    }

    addBook(book) {
        if (typeof book !== 'object'){
            throw new Error('Книга должна являться объектом');
        }
        if (!('title' in book && 
              'author' in book &&
              'year' in book &&
              'genre' in book)){
            throw new Error('Книга должна являться объектом с полями: title, author, year, genre');
        }
        
        let {title:t, author:a, year:y, genre:g} = book;
        t = t.toLowerCase().trim();
        a = a.toLowerCase().trim();
        g = g.toLowerCase().trim();
        const newBook = {
            title: t[0].toUpperCase() + t.slice(1),
            author: a[0].toUpperCase() + a.slice(1),
            year: y,
            genre: g,
        }
        if (!(this.#books.some((book) =>
            book.title === newBook.title &&
            book.author === newBook.author &&
            book.year === newBook.year &&
            book.genre === newBook.genre )
        )){
            this.#books.push(newBook);
            return true;
        }

        return false;
    }

    removeBook(title) {
        if (typeof title !== 'string' || title.trim() === ''){
            throw new Error('Название книги должно быть строкой, содержащей хотя бы 1 символ');
        }

        const startBooksCount = this.booksCount;
        this.#books = this.#books.filter(
            (book) => book.title.toLowerCase() !== title.trim().toLowerCase());
        
        return this.booksCount !== startBooksCount;
    }

    get booksCount(){
        return this.#books.length;
    }

    get books(){
        return [...this.#books];
    }

    toJSON() {
        return {
            name: this.name,
            books: this.#books,
        };
    }
}

function groupBooksByGenre(libraries){
    if (!Array.isArray(libraries)){
        throw new Error('В функцию groupBooksByGenre библиотеки должны быть переданы в виде массива');
    }

    const mapGenreToBooks = new Map();
    for (const library of libraries){
        if (!(library instanceof Library)){
            throw new Error('Все элементы должны принадлежать классу Library');
        }

        for (const book of library.books){
            if (!mapGenreToBooks.has(book.genre)){
                mapGenreToBooks.set(book.genre, []);
            }
            mapGenreToBooks.get(book.genre).push(book);
        }
    }
    return mapGenreToBooks;
}

function getUniqueAthors(libraries){
    if (!Array.isArray(libraries)){
        throw new Error('В функцию getUniqueAthors библиотеки должны быть переданы в виде массива');
    }

    const setAthors = new Set();
    for (const library of libraries){
        if (!(library instanceof Library)){
            throw new Error('Все элементы должны принадлежать классу Library');
        }

        for (const book of library.books){
            setAthors.add(book.author);
        }
    }
    return [...setAthors];
}

function groupBooksByYear(libraries){
    if (!Array.isArray(libraries)){
        throw new Error('В функцию groupBooksByYear библиотеки должны быть переданы в виде массива');
    }

    const mapBooksByYear = new Map();
    for (const library of libraries){
        if (!(library instanceof Library)){
            throw new Error('Все элементы должны принадлежать классу Library');
        }

        for (const book of library.books){
            if (!(mapBooksByYear.has(book.year))){
                mapBooksByYear.set(book.year, []);
            }
            mapBooksByYear.get(book.year).push(book);
        }
    }
    return mapBooksByYear;
}

function getUniqueYears(libraries){
    if (!Array.isArray(libraries)){
        throw new Error('В функцию groupBooksByYear библиотеки должны быть переданы в виде массива');
    }

    const setYears = new Set();
    for (const library of libraries){
        if (!(library instanceof Library)){
            throw new Error('Все элементы должны принадлежать классу Library');
        }

        for (const book of library.books){
            setYears.add(book.year);
        }
    }
    return [...setYears];
}

function getBooksByAuthor(author, libraries){
    if (!Array.isArray(libraries)){
        throw new Error('В функцию groupBooksByYear библиотеки должны быть переданы в виде массива');
    }

    const booksByAuthor = [];
    for (const library of libraries){
        if (!(library instanceof Library)){
            throw new Error('Все элементы должны принадлежать классу Library');
        }

        for (const book of library.books){
            if (book.author.toLowerCase() === author.toLowerCase()){
                booksByAuthor.push(book);
            }
        }
    }
    return booksByAuthor;
}


