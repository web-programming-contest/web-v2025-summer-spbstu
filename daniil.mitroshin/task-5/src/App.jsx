import { useTheme } from './ThemeContext';

const books = [
  { title: 'Гарри поттер и кубок огня', author: 'Дж. Роулинг' },
  { title: 'Преступление и наказание', author: 'Ф. Достоевский' },
  { title: 'Игра престолов', author: 'Дж. Мартин' },
  { title: 'Анна Каренина', author: 'Л. Толстой' }
];

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Темная тема' : '🌞 Светлая тема'}
      </button>

      <h1>Магазин книг</h1>

      {books.map((book, index) => (
        <div key={index} className="card">
          <strong>{book.title}</strong>
          <div>{book.author}</div>
        </div>
      ))}
    </div>
  );
}

