import './App.css';
import { useState } from 'react';
import { useRef } from 'react';
import { BooksList } from './BooksList';
import { SortControls } from './SortControls';

function App() {
  const books = [
    { "title": "Война и мир", "author": "Л.Н. Толстой", "rate": 5, "description": "Роман", "price": 530, "image": "images/War and Piece.jpg" },
    { "title": "1984", "author": "Дж. Оруэл", "rate": 4, "description": "Роман-антиутопия", "price": 600, "image": "images/1984.jpg" },
    { "title": "Великий Гэтсби", "author": "Ф.С. Фицджеральд", "rate": 4, "description": "Роман", "price": 500, "image": "images/The Great Gatsby.jpg" },
    { "title": "Преступление и наказание", "author": "Ф.М. Достоевский", "rate": 3, "description": "Триллер", "price": 480, "image": "./images/Crime and Punishment.jpg" },
    { "title": "Моби Дик, или белый кит", "author": "Г. Мелвилл", "rate": 5, "description": "Приключенческий роман", "price": 360, "image": "images/Moby Dick.jpg" }
  ];

  const sortButtons = [
    { "attribute": "title", "text": "Названию"},
    { "attribute": "rate", "text": "Рейтингу"},
    { "attribute": "price", "text": "Цене"}
  ];

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

  const booksListRef = useRef(null);

  const scrollLeft = () => {
    if (booksListRef.current) {
      booksListRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (booksListRef.current) {
      booksListRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <div className="app">
      <header>
        <span class="header-title">ЛУЧШИЕ КНИГИ</span>
      </header>
      <div className="buttons-container">
        <span>Сортировать по:</span>
        <SortControls sortBooks={ sortBooks } sortButtons={ sortButtons } />
      </div>
      <div className="books-scroll-container">
        <button className="scroll-button left" onClick={ scrollLeft }>
          &lt;
        </button>
        <div className={ `books-container ${ sortState ? "hidden" : "" }` }>
          <BooksList books={ displayBooks } ref={booksListRef} />
        </div>
        <button className="scroll-button right" onClick={ scrollRight }>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default App;
