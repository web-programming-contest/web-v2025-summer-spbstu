export const movieListEl = document.getElementById('movie-list');
export const addMovieFormEl = document.getElementById('add-movie-form');
export const newMovieTitleEl = document.getElementById('new-movie-title');
export const newMovieDirectorEl = document.getElementById('new-movie-director');

export function renderMovieCards(movies) {
    movieListEl.innerHTML = '';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'card movie-card';
        card.dataset.title = movie.title;
        card.innerHTML = `
            <h3>${movie.title}</h3>
            <p><strong>Режиссёр:</strong> ${movie.director}</p>
            <p><strong>Количество актёров:</strong> ${movie.castSize}</p>
            <ul>
                ${movie.actors.map(actor => `<li><span>${actor}</span><button class="remove-btn remove-actor-btn" data-actor-name="${actor}" title="Удалить актера">×</button></li>`).join('') || '<li>Актёры не добавлены</li>'}
            </ul>
            <form class="actor-form">
                <input type="text" placeholder="Имя и фамилия актера" required>
                <button type="submit">Добавить актера</button>
            </form>
            <button class="delete-movie-btn">Удалить фильм</button>
        `;
        movieListEl.appendChild(card);
    });
}