class Movie {
    constructor(title, director, ...actors) {
        this.title = title;
        this.director = director;
        this.actors = actors.flat();;
    }

    addActor(name) {
        this.actors.push(name);
    }

    removeActor(name) {
        this.actors = this.actors.filter(actor => actor !== name);
    }

    get castSize() {
        return this.actors.length;
    }
}


export default Movie;