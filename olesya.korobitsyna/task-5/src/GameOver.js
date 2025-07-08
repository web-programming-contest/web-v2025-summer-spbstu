import React from 'react';
import './GameOver.css';

const GameOver = ({ onRestart, score }) => {
  return (
    <div className="game-over">
      <h2>Game Over</h2>
      <p className="final-score">Your score: {score}</p>
      <button className="restart-btn" onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default GameOver;