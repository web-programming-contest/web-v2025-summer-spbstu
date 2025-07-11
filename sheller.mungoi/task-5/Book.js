function Book({ book, addToCart }) {
  return (
    <div className="book">
      <h3>{book.title}</h3>
      <p>Price: {book.price} ₽</p>
      <button onClick={() => addToCart(book.id)}>Add to cart</button>
    </div>
  );
}

export default Book;