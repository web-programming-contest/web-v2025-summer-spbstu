import React from 'react';
import BookSlider from '../../components/BookSlider/BookSlider';
import { booksData } from '../../constants/bookData';
import styles from './HomePage.module.css';

const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <h1 className={styles.title}>Хиты продаж</h1>
            <BookSlider books={booksData} />
        </div>
    );
};

export default HomePage;