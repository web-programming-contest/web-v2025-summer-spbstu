import { Movie } from './movie.js';

export function saveMovies(movies) {
    localStorage.setItem('movies', JSON.stringify(movies));
}

export function loadMovies() {
    const storedData = localStorage.getItem('movies');
    if (storedData) {
        const parsedMovies = JSON.parse(storedData);
        return parsedMovies.map(movie => new Movie(movie.title, movie.director, movie.actors));
    }

    return [
        new Movie('Начало', 'Кристофер Нолан', ['Леонардо Ди Каприо', 'Эллиот Пейдж']),
        new Movie('Джанго освобождённый', 'Квентин Тарантино', ['Джейми Фокс', 'Кристоф Вальц']),
    ];
}