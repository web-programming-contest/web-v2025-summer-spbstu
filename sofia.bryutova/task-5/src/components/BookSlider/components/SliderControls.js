import React from 'react';
import styles from '../BookSlider.module.css';

const SliderControls = ({ goToPrevious, goToNext, goToSlide, books, currentIndex }) => {
    return (
        <>
            <button onClick={goToPrevious} className={`${styles.sliderArrow} ${styles.prevArrow}`}>❮</button>
            <button onClick={goToNext} className={`${styles.sliderArrow} ${styles.nextArrow}`}>❯</button>

            <div className={styles.sliderFooter}>
                <div className={styles.slideCaption}>{books[currentIndex].title}</div>
                <div className={styles.paginationDots}>
                    {books.map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.dot} ${currentIndex === index ? styles.active : ''}`}
                            onClick={() => goToSlide(index)}
                        ></div>
                    ))}
                </div>
                <div className={styles.slideCounter}>{currentIndex + 1} / {books.length}</div>
            </div>
        </>
    );
};

export default SliderControls;