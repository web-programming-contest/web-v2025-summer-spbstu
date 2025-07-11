import { useState } from 'react';
import './App.css';
import { BOOKS } from './books';
import BookCard from './components/BookCard';
import ButtonForSort from './components/ButtonForSort';

function App() {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'increase',
  });

  const fields = ['title', 'price', 'rating'];
  const namesForButtons = ['Название', 'Цена', 'Рейтинг'];

  function handleSortClick(sortKey){
    let direction = 'increase';

    if (sortConfig.key === sortKey){
      if (sortConfig.direction === 'increase'){
        direction = 'decrease';
      } else if (sortConfig.direction === 'decrease'){
        direction = 'default';
      }
      else{
        direction = 'increase';
      }
    }

    setSortConfig({key: sortKey, direction});
  }

  const sortedBooks = (!sortConfig.key || sortConfig.direction === 'default')
  ? [...BOOKS]
  : [...BOOKS].sort((book1, book2) => {
    if (book1[sortConfig.key] < book2[sortConfig.key]){
      return sortConfig.direction === 'increase' ? -1 : 1;
    }
    if (book1[sortConfig.key] > book2[sortConfig.key]){
      return sortConfig.direction === 'increase' ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      <header>
        <h1>Управление книгами</h1>
      </header>

      <main>
        <h3>Выберите порядок сортировки книг:</h3>
        <div className="buttonsContainer">
          { fields.map((field, index) => (
            <ButtonForSort
              key={field}
              sortKey={field}
              sortConfig={sortConfig}
              onSortClick={() => handleSortClick(field)}
            >
              {namesForButtons[index]}
            </ButtonForSort>
          ))}
        </div>

        <div className='booksContainer'>
          {sortedBooks.map((book)=>(
            <BookCard
              key={book.title}
              book={book}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default App
