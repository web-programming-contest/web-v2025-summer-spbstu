import React from 'react';
import './NextPiece.css';

const NextPiece = ({ nextTetromino }) => {
  if (!nextTetromino) return null;

  return (
    <div className="next-piece-container">
      <h3>Next Piece</h3>
      <div className="next-piece">
        {nextTetromino.shape.map((row, y) => (
          <div key={y} className="next-row">
            {row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                className="next-cell"
                style={{
                  backgroundColor: cell ? nextTetromino.color : 'transparent',
                  border: cell ? `2px solid ${nextTetromino.color}` : 'none'
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextPiece;