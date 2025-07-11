import Movie from "./movie.js";

function groupByDirector(movies) {
    return movies.reduce((acc, movie) => {
        if (!acc[movie.director]) {
            acc[movie.director] = [];
        }
        acc[movie.director].push(movie);
        return acc;
    }, {});
}

function getUniqueActors(movies) {
    const allActors = movies.flatMap(movie => movie.actors);
    return [...new Set(allActors)];
}

function groupByActorCount(movies) {
    return movies.reduce((acc, movie) => {
        const count = movie.castSize;
        if (!acc[count]) {
            acc[count] = [];
        }
        acc[count].push(movie);
        return acc;
    }, {});
}

function getMoviesByActor(movies, actorName) {
    return movies.filter(movie => movie.actors.includes(actorName));
}

function getAllMovieTitles(movies) {
    return movies.map(movie => movie.title);
}

const movies = [
  new Movie("The Shawshank Redemption", "Frank Darabont", "Tim Robbins", "Morgan Freeman"),
  new Movie("The Godfather", "Francis Ford Coppola", "Marlon Brando", "Al Pacino", "James Caan"),
  new Movie("Pulp Fiction", "Quentin Tarantino", "John Travolta", "Samuel L. Jackson", "Uma Thurman"),
  new Movie("The Dark Knight", "Christopher Nolan", "Christian Bale", "Heath Ledger"),
  new Movie("Fight Club", "David Fincher", "Brad Pitt", "Edward Norton"),
];

const byDirector = groupByDirector(movies);
console.log("Фильмы по режиссёрам:");
console.log(byDirector);

const uniqueActors = getUniqueActors(movies);
console.log("\nУникальные актёры:");
console.log(uniqueActors);

const byActorCount = groupByActorCount(movies);
console.log("\nФильмы по количеству актёров:");
console.log(byActorCount);

const moviesWithPacino = getMoviesByActor(movies, "Al Pacino");
console.log("\nФильмы с Al Pacino:");
console.log(moviesWithPacino.map(m => m.title));

const allTitles = getAllMovieTitles(movies);
console.log("\nВсе названия фильмов:");
console.log(allTitles);