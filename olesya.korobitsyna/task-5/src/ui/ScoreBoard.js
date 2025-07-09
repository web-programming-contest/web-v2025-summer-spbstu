import React from 'react';
import './ScoreBoard.css';

const ScoreBoard = ({ score, level, isPaused }) => {
  return (
    <div className="score-board">
      <div className="score">Score: {score}</div>
      <div className="level">Level: {level}</div>
      {isPaused && <div className="paused-indicator">PAUSED</div>}
    </div>
  );
};

export default ScoreBoard;