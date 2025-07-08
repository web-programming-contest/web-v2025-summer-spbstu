export class Movie {

    constructor(title, director, actors = []) {

        if (typeof title !== 'string' || !title.trim()) {
            throw new Error('Movie title cannot be empty.');
        }
        if (typeof director !== 'string' || !director.trim()) {
            throw new Error('Director name cannot be empty.');
        }

        this.title = this.#normalizeTitle(title);
        this.director = this.#normalizeName(director)
        this.actors = Array.isArray(actors) ? actors.map(actor => this.#normalizeName(actor)) : [];
    }

    #normalizeTitle(title) {
        const trimmedTitle = title.trim();
        return trimmedTitle.charAt(0).toUpperCase() + trimmedTitle.slice(1);
    }

    #normalizeName(name) {
        if (typeof name !== 'string' || !name.trim()) {
            throw new Error('Name must not be an empty string');
        }
        return name
            .trim()
            .split(' ')
            .filter(p => p)
            .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
            .join(' ');
    }

    addActor(name) {
        const normalizedName = this.#normalizeName(name);

        if (this.actors.includes(normalizedName)) {
            throw new Error(`Actor "${name}" already exists`);
        }

        this.actors.push(normalizedName);
    }

    removeActor(name) {
        const normalizedName = this.#normalizeName(name);
        const index = this.actors.indexOf(normalizedName);

        if (index > -1) {
            this.actors.splice(index, 1);
        } else {
            throw new Error(`Actor "${name}" not found in the list`);
        }
    }

    get castSize() {
        return this.actors.length;
    }
}

export function groupByDirector(movies) {
    if (!Array.isArray(movies)) {
        throw new Error('Movies must be passed as an array');
    }

    const groupedMovies = {};

    for (const movie of movies) {
        const directorName = movie.director;

        if (!groupedMovies[directorName]) {
            groupedMovies[directorName] = [];
        }

        groupedMovies[directorName].push(movie);
    }
    return groupedMovies;
}

export function getUniqueActors(movies) {
    if (!Array.isArray(movies)) {
        throw new Error('Movies must be passed as an array');
    }

    const allActors = movies.flatMap(movie => movie.actors);
    return [...new Set(allActors)];
}

export function groupByCastSize(movies) {
    if (!Array.isArray(movies)) {
        throw new Error('Movies must be passed as an array');
    }

    const groupedBySize = {};

    for (const movie of movies) {
        const size = movie.castSize;

        if (!groupedBySize[size]) {
            groupedBySize[size] = [];
        }

        groupedBySize[size].push(movie);
    }
    return groupedBySize;
}

export function getMoviesByActor(movies, actorName) {
    if (!Array.isArray(movies)) {
        throw new Error('Movies must be passed as an array');
    }

    const normalizedActorName = actorName.trim().split(' ').map(
        part => { return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();}
    ).join(' ');

    const result = [];

    for (const movie of movies) {
        if (movie.actors.includes(normalizedActorName)) {
            result.push(movie);
        }
    }
    return result;
}

export function getTitlesOfMovies(movies) {
    return movies.map(movie => movie.title);
}






