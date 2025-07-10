import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from '../entities/board/GameBoard';
import NextPiece from '../entities/pieces/NextPiece';
import ScoreBoard from '../ui/ScoreBoard';
import GameOver from '../ui/GameOver';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: '#00FFFF' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#0000FF' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#FF7F00' },
  O: { shape: [[1, 1], [1, 1]], color: '#FFFF00' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#00FF00' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#FF00FF' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#FF0000' }
};

const createBoard = () => 
  Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill(null));

const TetrisGame = () => {
  const [board, setBoard] = useState(() => createBoard());
  const [currentTetromino, setCurrentTetromino] = useState(null);
  const [nextTetromino, setNextTetromino] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [rowsCleared, setRowsCleared] = useState(0);
  const [dropTime, setDropTime] = useState(1000);
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const randomTetromino = useCallback(() => {
    const tetrominoes = Object.keys(TETROMINOES);
    const randTetromino = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
    return {
      shape: TETROMINOES[randTetromino].shape,
      color: TETROMINOES[randTetromino].color
    };
  }, []);

  const initGame = useCallback(() => {
    const newBoard = createBoard();
    const firstTetromino = randomTetromino();
    const secondTetromino = randomTetromino();
    setBoard(newBoard);
    setCurrentTetromino(firstTetromino);
    setNextTetromino(secondTetromino);
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setRowsCleared(0);
    setDropTime(1000);
    setIsPaused(false);
    document.body.className = 'level-1';
  }, [randomTetromino]);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('tetrisHighScore') || 0;
    setHighScore(Number(savedHighScore));
    initGame();
  }, [initGame]);

  const checkCollision = useCallback((tetromino, pos, boardToCheck = board) => {
    for (let y = 0; y < tetromino.shape.length; y++) {
      for (let x = 0; x < tetromino.shape[y].length; x++) {
        if (tetromino.shape[y][x] !== 0) {
          const newX = pos.x + x;
          const newY = pos.y + y;
          
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT || 
              (newY >= 0 && boardToCheck[newY][newX] !== null)) {
            return true;
          }
        }
      }
    }
    return false;
  }, [board]);

  const rotateTetromino = useCallback(() => {
    if (!currentTetromino || gameOver || isPaused) return;
    
    const rotated = {
      shape: currentTetromino.shape[0].map((_, i) => 
        currentTetromino.shape.map(row => row[i]).reverse()
      ),
      color: currentTetromino.color
    };
    
    if (!checkCollision(rotated, position)) {
      setCurrentTetromino(rotated);
    }
  }, [currentTetromino, position, gameOver, isPaused, checkCollision]);

  const updateScore = useCallback((rows) => {
    const points = [0, 40, 100, 300, 1200];
    const newScore = score + points[rows] * level;
    const newRowsCleared = rowsCleared + rows;
    const newLevel = Math.floor(newRowsCleared / 10) + 1;
    
    setScore(newScore);
    setRowsCleared(newRowsCleared);
    
    if (newLevel > level) {
      setLevel(newLevel);
      setDropTime(1000 / newLevel);
      document.body.className = `level-${Math.min(newLevel, 10)}`;
    }

    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('tetrisHighScore', newScore);
    }
  }, [score, level, rowsCleared, highScore]);

  const checkRows = useCallback((boardToCheck) => {
    const rowsToRemove = [];
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (boardToCheck[y].every(cell => cell !== null)) {
        rowsToRemove.push(y);
      }
    }
    
    if (rowsToRemove.length > 0) {
      const newBoard = boardToCheck.filter((_, index) => !rowsToRemove.includes(index));
      while (newBoard.length < BOARD_HEIGHT) {
        newBoard.unshift(Array(BOARD_WIDTH).fill(null));
      }
      
      setBoard(newBoard);
      updateScore(rowsToRemove.length);
    }
  }, [updateScore]);

  const spawnNewTetromino = useCallback(() => {
    if (!nextTetromino) return false;
    
    const newTetromino = nextTetromino;
    const newNextTetromino = randomTetromino();
    const newPosition = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 };
    
    if (checkCollision(newTetromino, newPosition)) {
      setGameOver(true);
      setIsPaused(true);
      return false;
    }
    
    setCurrentTetromino(newTetromino);
    setNextTetromino(newNextTetromino);
    setPosition(newPosition);
    return true;
  }, [nextTetromino, checkCollision, randomTetromino]);

  const placeTetromino = useCallback(() => {
    if (!currentTetromino || isPaused) return;
    
    const newBoard = board.map(row => [...row]);
    let gameOverFlag = false;
    
    for (let y = 0; y < currentTetromino.shape.length; y++) {
      for (let x = 0; x < currentTetromino.shape[y].length; x++) {
        if (currentTetromino.shape[y][x] !== 0) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          
          if (boardY < 0) {
            gameOverFlag = true;
            break;
          }
          
          newBoard[boardY][boardX] = currentTetromino.color;
        }
      }
    }
    
    if (gameOverFlag) {
      setGameOver(true);
      setIsPaused(true);
      return;
    }
    
    setBoard(newBoard);
    checkRows(newBoard);
    spawnNewTetromino();
  }, [board, currentTetromino, isPaused, position, checkRows, spawnNewTetromino]);

  const moveTetromino = useCallback((direction) => {
    if (!currentTetromino || gameOver || isPaused) return;
    
    const newPosition = { ...position };
    switch (direction) {
      case 'left': newPosition.x -= 1; break;
      case 'right': newPosition.x += 1; break;
      case 'down': newPosition.y += 1; break;
      default: break;
    }
    
    if (!checkCollision(currentTetromino, newPosition)) {
      setPosition(newPosition);
    } else if (direction === 'down') {
      placeTetromino();
    }
  }, [currentTetromino, position, gameOver, isPaused, checkCollision, placeTetromino]);

  const hardDrop = useCallback(() => {
    if (gameOver || isPaused || !currentTetromino) return;

    let newPosition = { ...position };
    while (!checkCollision(currentTetromino, { ...newPosition, y: newPosition.y + 1 })) {
      newPosition.y += 1;
    }

    const newBoard = [...board.map(row => [...row])];
    let gameOverFlag = false;
    
    for (let y = 0; y < currentTetromino.shape.length; y++) {
      for (let x = 0; x < currentTetromino.shape[y].length; x++) {
        if (currentTetromino.shape[y][x]) {
          const boardY = newPosition.y + y;
          const boardX = newPosition.x + x;
          
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentTetromino.color;
          } else {
            gameOverFlag = true;
          }
        }
      }
    }

    if (gameOverFlag) {
      setGameOver(true);
      setIsPaused(true);
      return;
    }

    setBoard(newBoard);
    checkRows(newBoard);
    spawnNewTetromino();
  }, [board, currentTetromino, position, gameOver, isPaused, checkCollision, checkRows, spawnNewTetromino]);

  const drop = useCallback(() => {
    if (!gameOver && !isPaused) {
      moveTetromino('down');
    }
  }, [gameOver, isPaused, moveTetromino]);

  useEffect(() => {
    if (!gameOver && !isPaused) {
      const timer = setTimeout(drop, dropTime);
      return () => clearTimeout(timer);
    }
  }, [drop, gameOver, isPaused, dropTime]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (gameOver) return;
    
    switch (e.key) {
      case 'ArrowLeft': moveTetromino('left'); break;
      case 'ArrowRight': moveTetromino('right'); break;
      case 'ArrowDown': moveTetromino('down'); break;
      case 'ArrowUp': e.preventDefault(); rotateTetromino(); break;
      case ' ': e.preventDefault(); hardDrop(); break;
      case 'p': case 'P': togglePause(); break;
      default: break;
    }
  }, [gameOver, moveTetromino, rotateTetromino, hardDrop, togglePause]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="tetris-container">
      <div className="side-panel left-panel">
        <div className="controls">
          <div className="arrow-controls">
            <button className="arrow-btn up-btn" onClick={() => rotateTetromino()}>↑</button>
            <button className="arrow-btn left-btn" onClick={() => moveTetromino('left')}>←</button>
            <button className="arrow-btn down-btn" onClick={() => moveTetromino('down')}>↓</button>
            <button className="arrow-btn right-btn" onClick={() => moveTetromino('right')}>→</button>
          </div>

          <div className="drop-btn-container">
            <button className="drop-btn" onClick={hardDrop}>↓↓↓</button>
          </div>

          <div className="action-btns">
            <button className="pause-btn" onClick={togglePause}>
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button className="reset-btn" onClick={initGame}>Reset</button>
          </div>
        </div>
      </div>
      
      <div className="game-area">
        <GameBoard 
          board={board} 
          currentTetromino={isPaused ? null : currentTetromino} 
          position={position} 
        />
        {isPaused && !gameOver && <div className="pause-overlay">PAUSED</div>}
        {gameOver && <GameOver onRestart={initGame} score={score} />}
      </div>
      
      <div className="side-panel right-panel">
        <ScoreBoard score={score} level={level} isPaused={isPaused} highScore={highScore} />
        <div className="panel-spacer"></div>
        <NextPiece nextTetromino={nextTetromino} />
      </div>
    </div>
  );
};

export default TetrisGame;