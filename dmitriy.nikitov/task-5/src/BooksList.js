export function BooksList({ books, ref }) {
  const listItems = books.map(book => BookCard(book));
  return <div className="books-list" ref={ ref }>{ listItems }</div>
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
