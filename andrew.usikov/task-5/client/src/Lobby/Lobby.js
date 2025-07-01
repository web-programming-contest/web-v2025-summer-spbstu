import { useState, useEffect, useRef } from 'react';
import './Lobby.css';

export default function Lobby({ onCreateGame, onJoinGame, onBackToMenu, socket }) {
  const [availableGames, setAvailableGames] = useState([]);
  const isInit = useRef(false);

  useEffect(() => {
    if (isInit.current) {
      return;
    }
    isInit.current = true;
    init();
  }, []);

  function init() {
    socket.emit('get games');
    setInterval(() => {
      socket.emit('get games');
    }, 1000);
  }

  socket.on('games list', games => {
    setAvailableGames(games);
  });

  return (
    <div className="lobby-container">
      <h1 className="lobby-title">Available Games</h1>
      
      <div className="games-list">
        {availableGames.map(game => (
          <div key={game.id} className="game-item">
            <div className="game-info">
              <span className="game-creator">{game.creator}</span>
              <span className="game-players">{game.players.length}/2 players</span>
            </div>
            <button disabled={game.players.length === 2}
              className="join-button"
              onClick={() => onJoinGame(game.id)}
            >
              Join
            </button>
          </div>
        ))}
        
        {availableGames.length === 0 && (
          <div className="no-games">No available games found</div>
        )}
      </div>
      
      <div className="lobby-actions">
        <button 
          className="create-game-button"
          onClick={onCreateGame}
        >
          Create Game
        </button>
        <button 
          className="back-button"
          onClick={onBackToMenu}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}