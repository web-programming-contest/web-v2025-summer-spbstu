import React, { useState } from 'react';
import './HomePage.css';

export default function HomePage({ onSelectMode }) {
  const [nickname, setNickname] = useState('');

  return (
    <div className="home-container">
      <div className="glass-card">
        <h1 className="game-title">Tic Tac Toe</h1>
        
        <div className="nickname-input-container">
          <input
            type="text"
            placeholder="Enter your nickname..."
            className="nickname-input"
            value={nickname}
            maxLength={13}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        
        <div className="mode-selection">
          <button 
            className="mode-button player-vs-player"
            onClick={() => onSelectMode('player', nickname)}
          >
            <div className="button-content">
              <div className="button-icon">
                <img src="/images/PvP.png" alt="Player vs Player" />
              </div>
              <span className="button-text">Play vs Player</span>
            </div>
          </button>
          
          <button 
            className="mode-button player-vs-computer"
            onClick={() => onSelectMode('computer', nickname)}
          >
            <div className="button-content">
              <div className="button-icon">
                <img src="/images/PvC.png" alt="Player vs Computer" />
              </div>
              <span className="button-text">Play vs Computer</span>
            </div>
          </button>
        </div>
        
        <div className="game-footer">
          <p>Choose your game mode and start playing!</p>
        </div>
      </div>
    </div>
  );
}