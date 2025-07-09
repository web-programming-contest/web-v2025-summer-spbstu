import { Movie } from './movie.js';
import * as storage from './storage.js';
import * as ui from './ui.js';
import * as analytics from './analytics.js';

class MovieManager {
    constructor() {
        this.movies = [];
        this.init();
    }

    init() {
        this.movies = storage.loadMovies();
        this.setupEventListeners();
        this.update();
    }

    update() {
        ui.renderMovieCards(this.movies);
        storage.saveMovies(this.movies);
        analytics.logAnalytics(this.movies);
    }

    asyncOperation(callback) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    callback();
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }, 300);
        });
    }

    setupEventListeners() {
        ui.addMovieFormEl.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = ui.newMovieTitleEl.value.trim();
            const director = ui.newMovieDirectorEl.value.trim();

            if (!title || !director) {
                alert('Пожалуйста, заполните все поля.');
                return;
            }
            if (this.movies.some(m => m.title.toLowerCase() === title.toLowerCase())) {
                alert(`Фильм с названием "${title}" уже существует!`);
                return;
            }

            this.asyncOperation(() => {
                this.movies.push(new Movie(title, director));
            }).then(() => {
                this.update();
                ui.addMovieFormEl.reset();
            }).catch(error => alert(error.message));
        });

        ui.movieListEl.addEventListener('click', (e) => {
            const movieCard = e.target.closest('.movie-card');
            if (!movieCard) return;
            const movie = this.movies.find(m => m.title === movieCard.dataset.title);
            if (!movie) return;

            if (e.target.classList.contains('remove-actor-btn')) {
                const actorName = e.target.dataset.actorName;
                this.asyncOperation(() => movie.removeActor(actorName))
                    .then(() => this.update())
                    .catch(error => alert(error.message));
            }
            if (e.target.classList.contains('delete-movie-btn')) {
                if (confirm(`Удалить фильм "${movie.title}"?`)) {
                    this.asyncOperation(() => {
                        this.movies = this.movies.filter(m => m.title !== movie.title);
                    }).then(() => this.update()).catch(error => alert(error.message));
                }
            }
        });

        ui.movieListEl.addEventListener('submit', (e) => {
            if (!e.target.classList.contains('actor-form')) return;
            e.preventDefault();
            const movieCard = e.target.closest('.movie-card');
            const movie = this.movies.find(m => m.title === movieCard.dataset.title);
            const input = e.target.querySelector('input');
            if (!movie || !input.value) return;

            this.asyncOperation(() => movie.addActor(input.value))
                .then(() => {
                    this.update();
                    input.value = '';
                }).catch(error => alert(error.message));
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new MovieManager());