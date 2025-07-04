import { useState, useEffect } from "react";
import BookCard from "./components/BookCard";
import Modal from "./components/Modal";
import books from "./data/books";
import "./App.css";

function App() {
  const [selectedBook, setSelectedBook] = useState(null);

  const openModal = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="app">
      <h1>Каталог книг</h1>
      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onClick={openModal} />
        ))}
      </div>
      {selectedBook && <Modal book={selectedBook} onClose={closeModal} />}
    </div>
  );
}

export default App;
