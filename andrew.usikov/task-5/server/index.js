const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 8080;

let lobbyGames = [];

function getNextID() {
  let nextID = 0;
  do {
    nextID = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  } while (lobbyGames.filter((game => game.id === nextID)).length !== 0);
  return nextID;
}

app.use(express.json());

const clientBuildPath = path.join(__dirname, '../client/build');
app.use(express.static(clientBuildPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

io.on('connection', (socket) => {

  socket.on('get games', () => {
    socket.emit('games list', lobbyGames);
  });

  socket.on('create game', (creator) => {
    let newGame = {
      id: getNextID(),
      creator: creator,
      players: [creator],
      xIsFirst: Math.floor(Math.random() * 2) === 0,
      creatorFigure: ['X', 'O'][Math.floor(Math.random() * 2)],
      reInitRequest: false,
      reInitButtonState: [false, false],
    };
    lobbyGames.push(newGame);
    socket.emit('game id', newGame.id);
  });

  socket.on('join game', (id, nickname) => {
    const game = lobbyGames.find((game) => game.id === id);
    
    game.players.push(nickname);
  });

  socket.on('init request', (id, opponent) => {
    const game = lobbyGames.find((game) => game.id === id);

    if (game == null) {
      return;
    }

    socket.emit('init responce', game.xIsFirst, game.creatorFigure, opponent);
  });

  socket.on('init request joined', (id, nickname) => {
    const game = lobbyGames.find((game) => game.id === id);

    if (game == null) {
      return;
    }

    io.emit('opponent connect', id, nickname);
    socket.emit('init responce', game.xIsFirst, game.creatorFigure === 'X' ? 'O' : 'X', game.creator);
  });

  socket.on('game move', (id, i, figure) => {
    io.emit('game move responce', id, i, figure);
  });

  socket.on('re-init button pressed', (id, isCreator) => {
    const game = lobbyGames.find((game) => game.id === id);
    let index = isCreator ? 0 : 1;

    if (game == null) {
      return;
    }

    game.reInitButtonState[index] = true;
    if (game.reInitButtonState.every((state) => state === true)) {
      game.reInitButtonState = [false, false];
      game.xIsFirst = Math.floor(Math.random() * 2) === 0;
      game.creatorFigure = ['X', 'O'][Math.floor(Math.random() * 2)];
      io.emit('re-init approved', id);
    }
  });

  socket.on('re-init request', (id, isCreator) => {
    const game = lobbyGames.find((game) => game.id === id);

    if (game == null) {
      return;
    }

    if (isCreator) {
      socket.emit('init responce', game.xIsFirst, game.creatorFigure, game.players[1]);
    } else {
      socket.emit('init responce', game.xIsFirst, game.creatorFigure === 'X' ? 'O' : 'X', game.creator);
    }
  });

  socket.on('leave', (id, nickname) => {
    const game = lobbyGames.find((game) => game.id === id);

    if (game == null) {
      return;
    }
    const isCreator = nickname === game.creator;

    if (game.players.length === 1) {
      lobbyGames = lobbyGames.filter((game) => game.id !== id);
    } else {
      if (isCreator) {
        game.creator = game.players[1];
        game.players[0] = game.players[1];
        game.players.pop();
        game.xIsFirst = Math.floor(Math.random() * 2) === 0;
        game.creatorFigure = ['X', 'O'][Math.floor(Math.random() * 2)];
        io.emit('give creator', id);
      } else {
        game.players.pop();
        io.emit('player left', id, game.creator);
      }
    }
  });

});

http.listen(PORT);