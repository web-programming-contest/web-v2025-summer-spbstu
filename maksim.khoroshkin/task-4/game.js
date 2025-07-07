"use strict"

class Game {
    #allowedPlatforms = ["PC", "PS5", "NINTENDO", "XBOX", "PS4", "PS3", "ANDROID", "IOS"];

    constructor(title, releaseYear) {
        if (typeof title != "string" || !Number.isInteger(releaseYear)) {
            throw new Error("Title must be string and releaseYear must be number");
        }
        this.title = title;
        this.platforms = [];
        this.releaseYear = releaseYear;
    }

    addPlatform(platform) {
        if (this.#allowedPlatforms.includes(platform)) {
            throw new Error(`Not supported platform. Supported platforms: ${this.#allowedPlatforms}`);
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
