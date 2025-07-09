import React, { useMemo } from 'react';
import './GameBoard.css';

const Cell = React.memo(({ isFilled, color }) => (
  <div 
    className={`cell ${isFilled ? 'filled' : ''}`}
    style={{ backgroundColor: isFilled ? color : 'transparent' }}
  />
));

const GameBoard = ({ board, currentTetromino, position }) => {
  const tetrominoCells = useMemo(() => {
    const cells = {};
    if (currentTetromino) {
      currentTetromino.shape.forEach((row, ty) => {
        row.forEach((cell, tx) => {
          if (cell) {
            const x = position.x + tx;
            const y = position.y + ty;
            cells[`${y}-${x}`] = currentTetromino.color;
          }
        });
      });
    }
    return cells;
  }, [currentTetromino, position]);

  return (
    <div className="game-board">
      {board.map((row, y) => (
        <div key={`row-${y}`} className="row">
          {row.map((cell, x) => {
            const cellKey = `${y}-${x}`;
            const isCurrentTetrominoCell = tetrominoCells[cellKey];
            
            return (
              <Cell
                key={cellKey}
                isFilled={Boolean(cell) || Boolean(isCurrentTetrominoCell)}
                color={cell || isCurrentTetrominoCell}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default React.memo(GameBoard);