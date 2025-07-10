import { useState } from 'react';
import HomePage from './HomePage/HomePage';
import Game from './Game/Game';
import Lobby from './Lobby/Lobby';
import { io } from 'socket.io-client';

export default function App() {
  const [gameMode, setGameMode] = useState(null);
  const [nickname, setNickname] = useState('');
  const [inLobby, setInLobby] = useState(false);
  const [socket, _] = useState(io());
  const [gameID, setGameID] = useState(-1);

  const returnToMainMenu = () => {
    socket.emit('leave', gameID, nickname);
    setGameMode(null);
    setNickname('');
  }

  const handleSelectMode = (mode, nickname) => {
    setNickname(nickname);
    if (mode === 'player') {
      setInLobby(true);
    } else {
      setGameMode(mode);
    }
  };

  const handleCreateGame = () => {
    setGameMode('player');
    setInLobby(false);
    socket.emit('create game', nickname);
  };

  socket.on('game id', id => {
    setGameID(id);
  });

  const handleJoinGame = (gameId) => {
    setGameMode('player');
    setInLobby(false);
    setGameID(gameId);
    socket.emit('join game', gameId, nickname);
  };

  const handleBackToMenu = () => {
    setInLobby(false);
  };

  return (
    <div className="app-container">
      {gameMode ? (
        <Game gameMode={gameMode} nickname={nickname} onReturnToMainMenu={returnToMainMenu} socket={socket} id={gameID} />
      ) : inLobby ? (
        <Lobby 
          onCreateGame={handleCreateGame}
          onJoinGame={handleJoinGame}
          onBackToMenu={handleBackToMenu}
          socket={socket}
        />
      ) : (
        <HomePage onSelectMode={handleSelectMode} />
      )}
    </div>
  );
}