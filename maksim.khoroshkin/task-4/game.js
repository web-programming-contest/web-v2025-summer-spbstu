export class Game {
    #allowedPlatforms = ["PC", "PS5", "NINTENDO", "XBOX", "PS4", "PS3", "ANDROID", "IOS"];

    constructor(title,releaseYear, platforms = []) {
        if (typeof title != "string" || !Number.isInteger(releaseYear)) {
            throw new Error("Title must be string and releaseYear must be number");
        }
        this.title = title;
        this.releaseYear = releaseYear;
        if (!Array.isArray(platforms) || !platforms.every(elem => this.#allowedPlatforms.includes(elem))) {
            throw new Error(`Platforms ${platforms} is not supported. Supported platforms: ${this.#allowedPlatforms}`);
        }
        this.platforms = platforms;
        
    }

    addPlatform(platform) {
        if (!this.#allowedPlatforms.includes(platform)) {
            throw new Error(`Platform ${platform} is not supported. Supported platforms: ${this.#allowedPlatforms}`);
        }
        this.platforms = [...new Set(this.platforms).add(platform)];
    }

    removePlatform(platform) {
        if (!this.platforms.find((elem) => elem === platform)) {
            throw new Error("No such platform in the list");
        }
        this.platforms = this.platforms.filter((elem) => elem !== platform);
    }

    platformCount() {
        return this.platforms.length;
    }
}
