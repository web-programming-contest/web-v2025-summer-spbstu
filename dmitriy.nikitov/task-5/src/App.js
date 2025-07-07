import './App.css';
import { useState } from 'react';

function App() {
  const [books, setBooks] = useState([
    { "title": "War and Piece", "rate": "5.0", "description": "Novel by Tolstoy", "price": "300$" },
    { "title": "1984", "rate": "4.8", "description": "Dystopian novel by George Orwell", "price": "250$" },
    { "title": "The Great Gatsby", "rate": "4.7", "description": "Classic novel by F. Scott Fitzgerald", "price": "220$" },
    { "title": "Crime and Punishment", "rate": "4.9", "description": "Psychological thriller by Dostoevsky", "price": "280$" },
    { "title": "Moby Dick", "rate": "4.5", "description": "Adventure novel by Herman Melville", "price": "190$" }
  ]);

  const booksButtons = [
    "title",
    "price",
    "rate"
  ];

  const sortBooks = (attribute, rightOrder) => {
    const sortedBooks = [...books];
    if (attribute === "title") {
       sortedBooks.sort((a, b) => rightOrder ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
    }
    else if (attribute === "rate") {
      sortedBooks.sort((a, b) => rightOrder ? a.rate.localeCompare(b.rate) : b.rate.localeCompare(a.rate));
    }
    else {
      sortedBooks.sort((a, b) => rightOrder ? a.price.localeCompare(b.price) : b.price.localeCompare(a.price));
    }
    setBooks(sortedBooks);
}

  return (
    <div className="app">
      <h1>Library</h1>
      <BooksControls sortBooks={ sortBooks } booksButtons={ booksButtons } />
      <BooksList books={ books } />
    </div>
  );
}

function BooksList({ books }) {
  const listItems = books.map(book =>
    <div className="bookCard">
      <p>Title: { book.title }</p>
      <p>Rate: { book.rate }</p>
      <p>Description { book.description }</p>
      <p>Price: { book.price }</p>
    </div>
  );
  return <div className="booksContainer">{ listItems }</div>
}

function BooksControls({ sortBooks, booksButtons }) {
  const [sortDirection, setSortDirection] = useState(true);

  const handleSort = (attribute) => {
    sortBooks(attribute, sortDirection);
    setSortDirection(prev => !prev);
  };

  const listItems = booksButtons.map(button =>
    <button
      key={ button }
      id={ button }
      onClick={ () => handleSort(button) }
    >
      { button }
    </button>
  )
  return <div className="booksControls">{ listItems }</div>
}

export default App;
