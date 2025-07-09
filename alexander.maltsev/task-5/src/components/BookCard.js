import "./BookCard.css";

function BookCard({ book, onClick }) {
  return (
    <div className="book-card" onClick={() => onClick(book)}>
      <img src={book.cover} alt={book.title} className="book-cover" />
      <h3>{book.title}</h3>
    </div>
  );
}

export default BookCard;
