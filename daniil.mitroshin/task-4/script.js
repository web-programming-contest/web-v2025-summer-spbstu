class Game {
  constructor(title, platforms = [], releaseYear) {
    this.title = title;
    this.platforms = platforms;
    this.releaseYear = releaseYear;
  }

  addPlatform(platform) {
    if (!this.platforms.includes(platform)) {
      this.platforms.push(platform);
    }
  }

  removePlatform(platform) {
    this.platforms = this.platforms.filter(p => p !== platform);
  }

  get platformCount() {
    return this.platforms.length;
  }
}

let games = loadGames();
const gameList = document.getElementById("gameList");
const output = document.getElementById("output");

function saveGames() {
  localStorage.setItem("games", JSON.stringify(games));
}

function loadGames() {
  const raw = localStorage.getItem("games");
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  return parsed.map(g => new Game(g.title, g.platforms, g.releaseYear));
}

function renderGameCards() {
  gameList.innerHTML = "";
  games.forEach((game, i) => {
    const div = document.createElement("div");
    div.className = "game-card";
    div.innerHTML = `
      <strong>${game.title}</strong> (${game.releaseYear})<br>
      Платформы: ${game.platforms.join(", ")}<br>
      <button class="action" onclick="addPlatformUI(${i})">Добавить платформу</button>
      <button class="action" onclick="removePlatformUI(${i})">Удалить платформу</button>
      <button class="action" onclick="deleteGame(${i})">Удалить игру</button>
    `;
    gameList.appendChild(div);
  });
}

function addPlatformUI(index) {
  const platform = prompt("Введите платформу:");
  if (!platform) return;
  asyncAction(() => {
    games[index].addPlatform(platform);
    saveGames();
    renderGameCards();
  });
}

function removePlatformUI(index) {
  const platform = prompt("Введите платформу:");
  if (!platform) return;
  asyncAction(() => {
    games[index].removePlatform(platform);
    saveGames();
    renderGameCards();
  });
}

function deleteGame(index) {
  asyncAction(() => {
    games.splice(index, 1);
    saveGames();
    renderGameCards();
  });
}

function createGame(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const year = parseInt(document.getElementById("year").value);
  const platforms = document.getElementById("platforms").value.split(",").map(s => s.trim());
  asyncAction(() => {
    games.push(new Game(title, platforms, year));
    saveGames();
    renderGameCards();
  });
}

function asyncAction(callback) {
  new Promise(resolve => setTimeout(resolve, 300)).then(callback);
}

function handleMenu(value) {
  switch (value) {
    case "groupByYear": return groupByYear();
    case "groupByPlatformCount": return groupByPlatformCount();
    case "getGamesByPlatform": return getGamesByPlatform();
    case "getGamesAfterYear": return getGamesAfterYear();
  }
}

function groupByYear() {
  clearOutput();
  const groups = {};
  games.forEach(game => {
    if (!groups[game.releaseYear]) groups[game.releaseYear] = [];
    groups[game.releaseYear].push(game);
  });
  for (const year in groups) {
    renderGroup(`Год ${year}`, groups[year]);
  }
}

function groupByPlatformCount() {
  clearOutput();
  const groups = {};
  games.forEach(game => {
    const count = game.platformCount;
    if (!groups[count]) groups[count] = [];
    groups[count].push(game);
  });
  for (const count in groups) {
    renderGroup(`${count} платформ(ы)`, groups[count]);
  }
}

function getGamesByPlatform() {
  const platform = prompt("Введите платформу:");
  if (!platform) return;
  const result = games.filter(game => game.platforms.includes(platform));
  renderGroup(`Игры на платформе ${platform}`, result);
}

function getGamesAfterYear() {
  const year = parseInt(prompt("Введите год:"));
  if (isNaN(year)) return;
  const result = games.filter(game => game.releaseYear > year);
  renderGroup(`Игры после ${year} года`, result);
}

function showUniquePlatforms() {
  clearOutput();
  const set = new Set();
  games.forEach(g => g.platforms.forEach(p => set.add(p)));
  const div = document.createElement("div");
  div.innerHTML = `<h3>Уникальные платформы:</h3><p>${[...set].join(", ")}</p>`;
  output.appendChild(div);
}

function renderGroup(title, list) {
  const h3 = document.createElement("h3");
  h3.textContent = title;
  output.appendChild(h3);
  list.forEach(game => {
    const div = document.createElement("div");
    div.className = "game-card";
    div.innerHTML = `
      <strong>${game.title}</strong> (${game.releaseYear})<br>
      Платформы: ${game.platforms.join(", ")}<br>
      Кол-во платформ: ${game.platformCount}
    `;
    output.appendChild(div);
  });
}

function clearOutput() {
  output.innerHTML = "";
}

renderGameCards();