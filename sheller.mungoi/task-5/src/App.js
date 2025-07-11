import { useState } from 'react';
import BookList from './components/BookList';
import Cart from './components/Cart';

function App() {
  const [cart, setCart] = useState([]);

  const books = [
    { id: 1, title: "Power", price: 500 },
    { id: 2, title: "7 habits", price: 650 },
    { id: 3, title: "Web-Devlopment", price: 900 },
    { id: 4, title: "Подфак-Политех", price: 700 },
    { id: 5, title: "Russian for foreigeners", price: 2100 },  
  ];

  const addToCart = (bookId) => {
    const book = books.find(b => b.id === bookId);
    setCart(prevCart => {
      const item = prevCart.find(i => i.id === bookId);
      if (item) {
        return prevCart.map(i => 
          i.id === bookId ? { ...i, count: i.count + 1 } : i
        );
      }
      return [...prevCart, { ...book, count: 1 }];
    });
  };

  const increaseCount = (bookId) => {
    setCart(prevCart => 
      prevCart.map(i => 
        i.id === bookId ? { ...i, count: i.count + 1 } : i
      )
    );
  };

  const removeFromCart = (bookId) => {
    setCart(prevCart => prevCart.filter(i => i.id !== bookId));
  };

  return (
    <div className="app">
      <h1>Available books</h1>
      <BookList books={books} addToCart={addToCart} />
      
      <hr />
      
      <h2>Cart</h2>
      <Cart 
        cart={cart} 
        increaseCount={increaseCount} 
        removeFromCart={removeFromCart} 
      />
    </div>
  );
}

export default App;