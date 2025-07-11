import React, { useState } from 'react';
import BookCard from './components/BookCard';
import SliderControls from './components/SliderControls';
import styles from './BookSlider.module.css';

const BookSlider = ({ books }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    if (!books?.length) {
        return <div>Нет книг для отображения</div>;
    }

    return (
        <div className={styles.bookSlider}>
            <div className={styles.slideContent}>
                <BookCard book={books[currentIndex]} />
            </div>

            <SliderControls
                goToPrevious={goToPrevious}
                goToNext={goToNext}
                goToSlide={goToSlide}
                books={books}
                currentIndex={currentIndex}
            />
        </div>
    );
};

export default BookSlider;