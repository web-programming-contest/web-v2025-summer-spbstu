import {Game} from "./game.js"

function groupGamesByYear(games) {
    return Map.groupBy(games, game => game.releaseYear)
}

function getUniquePlatforms(games) {
    let uniquePlatforms = [];
    games.forEach(game => uniquePlatforms = uniquePlatforms.concat(game.platforms));

    return [...new Set(uniquePlatforms)];
}

function getGamesByPlatform(platform, games) {
    return games.filter(game => game.platforms.includes(platform));
}

function groupGamesByPlatformCount(games) {
    return Map.groupBy(games, game => game.platformCount())
}

function getGamesAfterYear(year, games) {
    return games.filter(game => game.releaseYear > year);
}

const common = ["PC", "PS4", "PS5", "XBOX"];

const games = [new Game("Witcher 3", 2015, common.concat("NINTENDO")), new Game("Elden Ring", 2022, common), new Game("Mario", 1985, ["NINTENDO"]),
   new Game("GTA V", 2013, common), new Game("God of War: Ragnarek", 2022, common.slice(0,3)), new Game("The Last of Us", 2013, common.slice(0,3))];

console.log(groupGamesByYear(games));
console.log(getUniquePlatforms(games));
console.log(getGamesByPlatform("PC", games));
console.log(groupGamesByPlatformCount(games));
console.log(getGamesAfterYear(2014, games));
