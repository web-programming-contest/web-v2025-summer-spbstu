import Movie from "./movie.js";

let movies = [];

const moviesList = document.getElementById('movies-list');
const addMovieBtn = document.getElementById('add-movie-btn');
const movieFormContainer = document.getElementById('movie-form-container');
const movieForm = document.getElementById('movie-form');
const cancelMovieBtn = document.getElementById('cancel-movie-btn');
const actorFormContainer = document.getElementById('actor-form-container');
const actorForm = document.getElementById('actor-form');
const cancelActorBtn = document.getElementById('cancel-actor-btn');
const actorNameInput = document.getElementById('actor-name');

function loadMovies() {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
        const parsedMovies = JSON.parse(storedMovies);
        movies = parsedMovies.map(movie => new Movie(movie.title, movie.director, ...movie.actors));
    }
    renderMovies();
}

function saveMovies() {
    localStorage.setItem('movies', JSON.stringify(movies));
}

function renderMovies() {
    moviesList.innerHTML = '';
    movies.forEach((movie, movieIndex) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <h3>${movie.title}</h3>
            <p><strong>Режиссер:</strong> ${movie.director}</p>
            <div class="actors-container">
                <h4>Актеры (${movie.actors.length}):</h4>
                <ul class="actors-list">
                    ${movie.actors.map((actor, actorIndex) => `
                        <li class="actor-item">
                            <span>${actor}</span>
                            <button class="delete-actor-btn" 
                                    data-movie-index="${movieIndex}" 
                                    data-actor-index="${actorIndex}">
                                Удалить
                            </button>
                        </li>
                    `).join('')}
                </ul>
                <button class="add-actor-btn" data-movie-index="${movieIndex}">
                    + Добавить актера
                </button>
            </div>
            <button class="delete-movie-btn" data-movie-index="${movieIndex}">
                Удалить фильм
            </button>
        `;
        moviesList.appendChild(movieCard);
    });

    setupEventListeners();
}

function setupEventListeners() {
    document.querySelectorAll('.delete-actor-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const movieIndex = e.target.dataset.movieIndex;
            const actorIndex = e.target.dataset.actorIndex;
            removeActor(movieIndex, actorIndex)
                .then(() => {
                    saveMovies();
                    renderMovies();
                });
        });
    });

    document.querySelectorAll('.add-actor-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const movieIndex = e.target.dataset.movieIndex;
            actorForm.dataset.movieIndex = movieIndex;
            actorFormContainer.classList.remove('hidden');
            actorNameInput.focus();
        });
    });

    document.querySelectorAll('.delete-movie-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const movieIndex = e.target.dataset.movieIndex;
            removeMovie(movieIndex)
                .then(() => {
                    saveMovies();
                    renderMovies();
                });
        });
    });
}

function addMovie(title, director) {
    return new Promise(resolve => {
        setTimeout(() => {
            movies.push(new Movie(title, director));
            resolve();
        }, 500);
    });
}

function removeMovie(index) {
    return new Promise(resolve => {
        setTimeout(() => {
            movies.splice(index, 1);
            resolve();
        }, 500);
    });
}

function addActor(movieIndex, actorName) {
    return new Promise(resolve => {
        setTimeout(() => {
            movies[movieIndex].addActor(actorName);
            resolve();
        }, 500);
    });
}

function removeActor(movieIndex, actorIndex) {
    return new Promise(resolve => {
        setTimeout(() => {
            movies[movieIndex].actors.splice(actorIndex, 1);
            resolve();
        }, 500);
    });
}

addMovieBtn.addEventListener('click', () => {
    movieFormContainer.classList.remove('hidden');
});

cancelMovieBtn.addEventListener('click', () => {
    movieFormContainer.classList.add('hidden');
    movieForm.reset();
});

movieForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    
    addMovie(title, director)
        .then(() => {
            saveMovies();
            movieFormContainer.classList.add('hidden');
            movieForm.reset();
            renderMovies();
        });
});

cancelActorBtn.addEventListener('click', () => {
    actorFormContainer.classList.add('hidden');
    actorForm.reset();
});

actorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieIndex = actorForm.dataset.movieIndex;
    const actorName = actorNameInput.value;
    
    if (movieIndex !== undefined && actorName) {
        addActor(movieIndex, actorName)
            .then(() => {
                saveMovies();
                actorFormContainer.classList.add('hidden');
                actorForm.reset();
                renderMovies();
            });
    }
});

loadMovies();