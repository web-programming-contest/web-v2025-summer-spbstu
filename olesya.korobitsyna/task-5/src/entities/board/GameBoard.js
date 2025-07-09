import React, { useMemo } from 'react';
import './GameBoard.css';

const Cell = React.memo(({ 
  cellValue, 
  currentTetromino, 
  position, 
  x, 
  y 
}) => {
  const isCurrentTetrominoCell = useMemo(() => {
    if (!currentTetromino) return false;
    
    const relX = x - position.x;
    const relY = y - position.y;
    
    return (
      relX >= 0 &&
      relY >= 0 &&
      relX < currentTetromino.shape[0].length &&
      relY < currentTetromino.shape.length &&
      currentTetromino.shape[relY][relX]
    );
  }, [currentTetromino, position, x, y]);

  const color = isCurrentTetrominoCell ? currentTetromino.color : cellValue;
  const isFilled = Boolean(cellValue) || isCurrentTetrominoCell;

  return (
    <div 
      className={`cell ${isFilled ? 'filled' : ''}`}
      style={{ backgroundColor: isFilled ? color : 'transparent' }}
    />
  );
});

const GameBoard = ({ board, currentTetromino, position }) => {
  return (
    <div className="game-board">
      {board.map((row, y) => (
        <div key={`row-${y}`} className="row">
          {row.map((cell, x) => (
            <Cell
              key={`${y}-${x}`}
              cellValue={cell}
              currentTetromino={currentTetromino}
              position={position}
              x={x}
              y={y}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default React.memo(GameBoard);
