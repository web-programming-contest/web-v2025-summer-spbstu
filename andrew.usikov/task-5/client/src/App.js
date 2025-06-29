import { useState } from 'react';
import HomePage from './HomePage/HomePage';
import Game from './Game/Game';

export default function App() {
  const [gameMode, setGameMode] = useState(null);
  const [nickname, setNickname] = useState('');

  return (
    <div className="app-container">
      {gameMode ? (
        <Game gameMode={gameMode} nickname={nickname} />
      ) : (
        <HomePage onSelectMode={(mode, nick) => {
          setGameMode(mode);
          setNickname(nick);
        }} />
      )}
    </div>
  );
}