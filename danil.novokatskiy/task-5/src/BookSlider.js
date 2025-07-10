import React, { useState } from 'react';
import './BookSlider.css'

const BookSlider = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? books.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === books.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const currentBook = books[currentIndex];

  return (
    <div className="slider-container">
      <h2 className="slider-title">Рекомендуемые книги</h2>
      <div className="slider">
        <button className="arrow left-arrow" onClick={goToPrevious}>
          ❰
        </button>

        <div className="slide">
          <div className="book-card">
            <img
              src={currentBook.coverImage}
              alt={currentBook.title}
              className="book-cover"
            />
            <div className="book-info">
              <h3 className="book-title">{currentBook.title}</h3>
              <div className="book-rating">
                {Array(5).fill().map((_, i) => (
                  <span key={i} className={`star ${i < currentBook.rating ? 'filled' : ''}`}>
                    ★
                  </span>
                ))}
              </div>
              <p className="book-description">{currentBook.description}</p>
              <div className="book-price">{currentBook.price} ₽</div>
            </div>
          </div>
          <p className="slide-text">{currentBook.slideText}</p>
        </div>

        <button className="arrow right-arrow" onClick={goToNext}>
          ❱
        </button>
      </div>

      <div className="slider-counter">
        {currentIndex + 1} / {books.length}
      </div>

      <div className="dots-container">
        {books.map((book, index) => (
          <button
            key={book.id}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            •
          </button>
        ))}
      </div>
    </div>
  );

};

export default BookSlider;