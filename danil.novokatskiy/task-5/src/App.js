import './App.css';
import BookSlider from './BookSlider';

function App() {
  const books = [
    {
      id: 1,
      title: 'JavaScript: The Good Parts',
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg',
      rating: 4,
      description: 'This book reveals a subset of JavaScript that\'s more reliable, readable, and maintainable than the language as a whole.',
      price: 1299,
      slideText: 'Лучшая книга по JavaScript для начинающих'
    },
    {
      id: 2,
      title: 'Clean Code',
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg',
      rating: 5,
      description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees.',
      price: 1499,
      slideText: 'Обязательная книга для каждого программиста'
    },
    {
      id: 3,
      title: 'Design Patterns',
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/51szD9HC9pL._SX395_BO1,204,203,200_.jpg',
      rating: 5,
      description: 'Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.',
      price: 1799,
      slideText: 'Классика программирования - паттерны проектирования'
    }
  ];

  return (
    <div className="App">
      <BookSlider books={books} />
    </div>
  );
}

export default App;
