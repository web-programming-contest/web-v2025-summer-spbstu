import {
    groupByDirector,
    getUniqueActors,
    groupByCastSize,
    getMoviesByActor,
    getTitlesOfMovies
} from './movie.js';

export function logAnalytics(movies) {
    console.clear();
    console.log("=== Аналитика по фильмам ===");
    console.log("Группировка по режиссёру:", groupByDirector(movies));
    console.log("Уникальные актёры:", getUniqueActors(movies));
    console.log("Группировка по кол-ву актёров:", groupByCastSize(movies));
    console.log("Фильмы с 'Кристоф Вальц':", getMoviesByActor(movies, 'Кристоф Вальц'));
    console.log("Все названия фильмов:", getTitlesOfMovies(movies));
    console.log("============================");
}