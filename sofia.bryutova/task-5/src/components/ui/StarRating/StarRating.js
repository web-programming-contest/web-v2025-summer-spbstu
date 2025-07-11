import React from 'react';
import styles from './StarRating.module.css';

const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className={i <= rating ? styles.filled : styles.star}>
        ★
      </span>
        );
    }
    return <div className={styles.ratingContainer}>{stars} ({rating})</div>;
};

export default StarRating;