import React from 'react';
import './GameBoard.css';

const GameBoard = ({ board, currentTetromino, position }) => {
  const renderCell = (cell, x, y) => {
    let color = cell;
    
    if (currentTetromino && 
        y >= position.y && y < position.y + currentTetromino.shape.length &&
        x >= position.x && x < position.x + currentTetromino.shape[0].length) {
      const tetrominoY = y - position.y;
      const tetrominoX = x - position.x;
      
      if (currentTetromino.shape[tetrominoY]?.[tetrominoX]) {
        color = currentTetromino.color;
      }
    }
    
    return (
      <div 
        key={`${y}-${x}`}
        className={`cell ${color ? 'filled' : ''}`}
        style={{ backgroundColor: color || 'transparent' }}
      />
    );
  };

  return (
    <div className="game-board">
      {board.map((row, y) => (
        <div key={y} className="row">
          {row.map((cell, x) => renderCell(cell, x, y))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;