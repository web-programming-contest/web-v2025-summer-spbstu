import Book from './Book';

function BookList({ books, addToCart }) {
  return (
    <div className="book-list">
      {books.map(book => (
        <Book key={book.id} book={book} addToCart={addToCart} />
      ))}
    </div>
  );
}

export default BookList;