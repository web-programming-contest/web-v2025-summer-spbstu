import React from 'react';
import StarRating from '../../ui/StarRating/StarRating';
import styles from '../BookSlider.module.css';

const BookCard = ({ book }) => {
    if (!book) return null;

    return (
        <div className={styles.bookCard}>
            <img src={book.coverUrl} alt={book.title} className={styles.bookCover} />
            <div className={styles.bookInfo}>
                <h2 className={styles.bookTitle}>{book.title}</h2>
                <p className={styles.bookAuthor}>{book.author}</p>
                <StarRating rating={book.rating} />
                <p className={styles.bookDescription}>{book.description}</p>
                <div className={styles.bookPrice}>{book.price}</div>
            </div>
        </div>
    );
};

export default BookCard;