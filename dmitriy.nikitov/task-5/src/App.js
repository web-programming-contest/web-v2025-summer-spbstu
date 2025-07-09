import './App.css';
import { useState } from 'react';
import { useRef } from 'react';

function App() {
  const booksListRef = useRef(null);

  const scrollLeft = () => {
    if (booksListRef.current) {
      booksListRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (booksListRef.current) {
      booksListRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const books = [
    { "title": "Война и мир", "author": "Л.Н. Толстой", "rate": 5, "description": "Роман", "price": 530, "image": "images/War and Piece.jpg" },
    { "title": "1984", "author": "Дж. Оруэл", "rate": 4, "description": "Роман-антиутопия", "price": 600, "image": "images/1984.jpg" },
    { "title": "Великий Гэтсби", "author": "Ф.С. Фицджеральд", "rate": 4, "description": "Роман", "price": 500, "image": "images/The Great Gatsby.jpg" },
    { "title": "Преступление и наказание", "author": "Ф.М. Достоевский", "rate": 3, "description": "Триллер", "price": 480, "image": "./images/Crime and Punishment.jpg" },
    { "title": "Моби Дик, или белый кит", "author": "Г. Мелвилл", "rate": 5, "description": "Приключенческий роман", "price": 360, "image": "images/Moby Dick.jpg" }
  ]
  const [displayBooks, setDisplayBooks] = useState(books);
  const [sortState, setSortState] = useState(false);

  const sortBooks = async (attribute, rightOrder) => {
    setSortState(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    const sortedBooks = [...books];
    if (attribute === "title") {
      sortedBooks.sort((a, b) => rightOrder ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title));
    }
    else if (attribute === "rate") {
      sortedBooks.sort((a, b) => rightOrder ? b.rate - a.rate : a.rate - b.rate);
    }
    else if (attribute === "price") {
      sortedBooks.sort((a, b) => rightOrder ? b.price - a.price : a.price - b.price);
    }
    setDisplayBooks(sortedBooks);
    setSortState(false);
  };

  const booksButtons = [
    { "attribute": "title", "text": "Названию"},
    { "attribute": "rate", "text": "Рейтингу"},
    { "attribute": "price", "text": "Цене"}
  ];

  return (
    <div className="app">
      <header>
        <span class="header-title">ЛУЧШИЕ КНИГИ</span>
      </header>
      <div className="buttons-container">
        <span>Сортировать по:</span>
        <BooksControls sortBooks={ sortBooks } booksButtons={ booksButtons } />
      </div>
      <div className="books-scroll-container">
        <button className="scroll-button left" onClick={scrollLeft}>
          &lt;
        </button>
        <div className={ `books-container ${ sortState ? "hidden" : "" }` }>
          <BooksList books={ displayBooks } ref={booksListRef} />
        </div>
        <button className="scroll-button right" onClick={scrollRight}>
          &gt;
        </button>
      </div>
    </div>
  );
}

const Rating = ({ rate }) => {
  const maxRating = 5;
  return (
    <div className="rating-result">
      {[...Array(maxRating)].map((_, index) => (
        <span key={ index } className={ index < rate ? "active" : "disable" }>★</span>
      ))}
    </div>
  );
};

function BooksList({ books, ref }) {
  const listItems = books.map(book => BookCard(book));
  return <div className="books-list" ref={ ref }>{ listItems }</div>
}

function BookCard(book) {
  return (
    <div className="book-card">
      <div className="book-image">
        <img src={ book.image } alt={ book.title } />
      </div>
      <span className="book-price">{ book.price + " ₽" }</span>
      <span className="book-title">{ book.title }</span>
      <span className="book-author">{ book.author }</span>
      <Rating rate={ book.rate } />
      <span className="book-description">{ book.description }</span>
    </div>
  );
}

const SortDirection = {
  "forward": 0,
  "reverse": 1,
  "default": 2
}

function BooksControls({ sortBooks, booksButtons }) {
  const [sortType, setSortType] = useState("none");
  const [sortDirection, setSortDirection] = useState(SortDirection.default);

  const handleSort = (attribute) => {
    if (attribute === sortType) {
      if (sortDirection === SortDirection.default) {
        setSortType("none");
        sortBooks("none", sortDirection);
      }
      else
      {
        sortBooks(sortType, sortDirection);
        setSortDirection(SortDirection.default);
      }
    }
    else {
      sortBooks(attribute, SortDirection.forward);
      setSortType(attribute);
      setSortDirection(SortDirection.reverse);
    }
  };

  const getSortIndicator = (attribute) => {
    if (sortType !== attribute) return null;
    if (sortDirection === SortDirection.reverse) {
      return " ↑";
    }
    else if (sortDirection === SortDirection.default) {
      return " ↓";
    }
    else {
      return null;
    }
  }

  const listItems = booksButtons.map(button =>
    <button key={ button.attribute } id={ button.attribute }
      onClick={ () => handleSort(button.attribute) }>
      { button.text } { getSortIndicator(button.attribute) }
    </button>
  )
  return <div className="sort-buttons">{ listItems }</div>
}

export default App;
