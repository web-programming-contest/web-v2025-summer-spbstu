import {Game} from "./game.js"

const timeout = 100;

document.addEventListener('DOMContentLoaded', () => {
    initializeListeners();
    renderCards();
});

function initializeListeners() {
    document.getElementById("processNewGame").addEventListener('click', processNewGame);
    document.getElementById("processDeleteGame").addEventListener('click', processDeleteGame);
    document.getElementById("processNewPlatform").addEventListener('click', processNewPlatform);
    document.getElementById("processDeletePlatform").addEventListener('click', processDeletePlatform);
}

function renderCards() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const cards = loadFromLocalStorage();
            let placeForGames = document.getElementById("cards");
            let placeForDelete = document.getElementById("gameToDelete");
            let placeForAddPlatform = document.getElementById("selectGame");
            let placeForDeletePlatform = document.getElementById("deleteGamePlatform");
            placeForGames.innerHTML = "";
            placeForDelete.innerHTML = "";
            placeForAddPlatform.innerHTML = "";
            placeForDeletePlatform.innerHTML = "";
            for (let game of cards) {
                let div = document.createElement('div');
                div.innerHTML = `<span>Игра: ${game.title}</span><br><br><span>Дата выхода: ${game.releaseYear}</span><br><br>`;
                if (game.platformCount() != 0) {
                    div.innerHTML += `<span>Платформы:</span>`;
                    game.platforms.forEach((platform) => {
                        div.innerHTML += `<li>${platform}</li>`;
                    });
                };
                placeForGames.appendChild(div);

                placeForDelete.appendChild(createOption(game));
                placeForAddPlatform.appendChild(createOption(game));
                placeForDeletePlatform.appendChild(createOption(game));
            }
            resolve(true);
        }, timeout)
    });

}

function createOption(game) {
    let option = document.createElement('option');
    option.textContent = game.title;
    return option;
}

async function processNewGame() {
    try {
        await addNewGame();
        await renderCards();
    } catch(error) {
        alert(error);
    }
}

function addNewGame() {
    return new Promise((resolve, reject) => {
        setTimeout(()  => {
            try {
                const inputName = document.getElementById("inputName").value.trim();
                const inputYear = document.getElementById("inputYear").value.trim();

                if (inputName.length <= 0 || parseInt(inputYear) > 2025 || parseInt(inputYear) < 1930) {
                    throw new Error("Title must not be empty and release year from 1930 to 2025");
                }

                let games = loadFromLocalStorage();

                if (games.filter(game => game.title == inputName).length) {
                    throw new Error(`${inputName} is already in the list`);
                }

                games.push(new Game(inputName, parseInt(inputYear)));

                saveToLocalStorage(games);

                resolve();
            } catch (error) {
                reject(error);
            }
        }, timeout);
    });
}

async function processDeleteGame() {
    try {
        await deleteGame();
        await renderCards();
    } catch(error) {
        alert(error);
    }
}

function deleteGame() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const select = document.getElementById("gameToDelete");

            let games = loadFromLocalStorage();

            games = games.filter((game) => game.title !== select.value);
            
            saveToLocalStorage(games);

            resolve(true);
        }, timeout);
    });
}

async function processNewPlatform() {
    try {
        await addNewPlatform();
        await renderCards();
    } catch(error) {
        alert(error);
    }
}

function addNewPlatform() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const selectGame = document.getElementById("selectGame");
            const selectPlatform = document.getElementById("selectPlatform");

            let games = loadFromLocalStorage();

            games.forEach((game) => {
                if (game.title === selectGame.value) {
                    game.addPlatform(selectPlatform.value);
                }
            });

            saveToLocalStorage(games);
            resolve(true);
        }, timeout);
    });
}

async function processDeletePlatform() {
    try {
        await deletePlatform();
        await renderCards();
    } catch(error) {
        alert(error);
    }
}

function deletePlatform() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const selectGame = document.getElementById("deleteGamePlatform");
            const selectPlatform = document.getElementById("selectPlatformDelete");

            let games = loadFromLocalStorage();

            games.forEach((game) => {
                if (game.title === selectGame.value) {
                    game.removePlatform(selectPlatform.value);
                }
            });

            saveToLocalStorage(games);
            resolve(true);
        }, timeout);
    });
}

function saveToLocalStorage(games) {
    localStorage.setItem("games", JSON.stringify(games));
}

function loadFromLocalStorage() {
    let gamesArr = [];
    const games = JSON.parse(localStorage.getItem("games"));
    if (!games) {
        return gamesArr;
    }
    for (let game of games) {
        gamesArr.push(new Game(game.title, game.releaseYear, game.platforms));
    }
    return gamesArr;
}

// const common = ["PC", "PS4", "PS5", "XBOX"];

// const games = [new Game("Witcher 3", 2015, common.concat("NINTENDO")), new Game("Elden Ring", 2022, common), new Game("Mario", 1985, ["NINTENDO"]),
//    new Game("GTA V", 2013, common), new Game("God of War: Ragnarek", 2022, common.slice(0,3)), new Game("The Last of Us", 2013, common.slice(0,3))];

// saveToLocalStorage(games);

