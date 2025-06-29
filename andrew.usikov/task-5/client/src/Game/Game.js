import { useState, useEffect, useRef } from 'react';
import './Game.css';

function Square({ value, onSquareClick, ifInWinCombo }) {
  return (
    <button className={ifInWinCombo ? "square win-highlight" : "square"} onClick={onSquareClick}>
      {value !== '' ? <img className="figure" src={value === 'X' ? '/images/cross.png' : value === 'O' ? 'images/circle.png' : null}></img> : <></>}
    </button>
  );
}

function Board({ xIsNext, squares, userIsNext, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares)[0] || squares[i] || !userIsNext) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const [winner, combo] = calculateWinner(squares);
  const tie = detectFull(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (tie) {
    status = 'Tie!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  let buttonInCombo = Array(9).fill(false);

  if (winner) {
    for (let i = 0; i < 9; i++) {
        buttonInCombo[i] = combo.includes(i);    
    }
  }

  return (
    <>
      <div className={winner != null ? "status winner" : tie ? "status tie" : "status"}>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} ifInWinCombo={buttonInCombo[0]} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} ifInWinCombo={buttonInCombo[1]} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} ifInWinCombo={buttonInCombo[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} ifInWinCombo={buttonInCombo[3]} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} ifInWinCombo={buttonInCombo[4]} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} ifInWinCombo={buttonInCombo[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} ifInWinCombo={buttonInCombo[6]} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} ifInWinCombo={buttonInCombo[7]} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} ifInWinCombo={buttonInCombo[8]} />
      </div>
    </>
  );
}

export default function Game({gameMode, nickname}) {
  const [boardState, setBoardState] = useState(Array(9).fill(''));
  const [currentMove, setCurrentMove] = useState(0);
  const [userFigure, setUserFigure] = useState('');
  const [xIsFirst, setFirstFigure] = useState(Math.floor(Math.random() * 2) === 0);
  const [gameOver, setGameOver] = useState(false);
  const isInit = useRef(false);
  const xIsNext = (currentMove % 2 === 0 && xIsFirst) || (currentMove % 2 === 1 && !xIsFirst);
  const userIsNext = userFigure === '' ? true : ((userFigure === 'X' && xIsNext) || (userFigure === 'O' && !xIsNext));

  useEffect(() => {
    if (isInit.current) {
      return;
    }
    console.log("Init the game");
    isInit.current = true;
    init();
  }, []);

  useEffect(() => {
    if (gameMode === 'computer') {
      if (!userIsNext) {
        makeAIMove();
      }
    }
  }, [currentMove]);

  function init() {
    if (gameMode === 'computer') {
      let idx = Math.floor(Math.random() * 2);
      let userFigure = ['X', 'O'][idx]
      let userIsNext = ((userFigure === 'X' && xIsNext) || (userFigure === 'O' && !xIsNext));

      if (!userIsNext) {
        makeAIMove(userFigure);
      }
      setUserFigure(userFigure);
    } else {
      /* тут надо ждать ответа от сервера, что он выбрал кому кем ходить (наверное) */
    }
  }

  function chooseMove(squares, player, possibleMoves) {
    const opponent = player === 'X' ? 'O' : 'X';
    
    function evaluate(board) {
      const [winner, _] = calculateWinner(board);

      if (winner === player) {
        return +10;
      }
      if (winner === opponent) {
        return -10;
      }
      return 0;
    }

    function minimax(board, depth, isMaximizing) {
      const score = evaluate(board);
        
      if (score !== 0) {
        return score;
      }
      if (detectFull(board)) {
        return 0;
      }
        
      let best = isMaximizing ? -Infinity : +Infinity;
        
      for (let i = 0; i < 9; i++) {
        if (board[i]) {
          continue;
        }
            
        // Emulate move
        board[i] = isMaximizing ? player : opponent;
        const currentScore = minimax(board, depth + 1, !isMaximizing);
        board[i] = '';
           
        if (isMaximizing) {
          best = Math.max(best, currentScore - depth);
        } else {
          best = Math.min(best, currentScore + depth);
        }
      }
        
      return best;
    }
    
    let bestScore = -Infinity;
    let bestMove = -1;
    
    for (let move of possibleMoves) {
      squares[move] = player;
      const moveScore = minimax(squares, 0, false);
      squares[move] = '';
        
      if (moveScore > bestScore) {
        bestScore = moveScore;
        bestMove = move;
      }
    }
    
    return bestMove;
  }

  function makeAIMove(dummy = "") {
    let [winner, _] = calculateWinner(boardState);
    let full = detectFull(boardState);
    let aiFigure = userFigure === 'X' ? 'O' : 'X';

    if (dummy !== '') {
      aiFigure = dummy === 'X' ? 'O' : 'X';
    }

    if (winner || full) {
      return;
    }

    let possibleMoves = [];

    for (let i = 0; i < 9; i++) {
      if (boardState[i] === '') {
        possibleMoves.push(i);
      }
    }

    if (possibleMoves.length === 9 || possibleMoves.length === 8) {
      // First move is often random so we give user a chance to beat computer

      if ((boardState[0] === userFigure || boardState[2] === userFigure ||
           boardState[6] === userFigure || boardState[8] === userFigure) &&
           userFigure !== '' && Math.random() < 0.7) {
        boardState[4] = aiFigure;
      } else if ((boardState[0] === userFigure || boardState[2] === userFigure ||
                  boardState[6] === userFigure || boardState[8] === userFigure) &&
                  userFigure !== '' && Math.random() < 0.6) {
        let move = [0, 2, 6, 8][Math.floor(Math.random() * 4)];
        boardState[move] = aiFigure;
      } else {
        let move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        boardState[move] = aiFigure;
      }
    } else {
      let nextSquares = boardState.slice();
      let move = chooseMove(nextSquares, aiFigure, possibleMoves);
      boardState[move] = aiFigure;
    }

    setTimeout(() => {
      handlePlay(boardState);
    }, 300);
  }

  function handlePlay(nextSquares) {
    setBoardState(nextSquares);
    setCurrentMove(currentMove + 1);

    const [winner, _] = calculateWinner(nextSquares);
    const isTie = !winner && detectFull(nextSquares);
    if (winner || isTie) {
      setGameOver(true);
    }
  }

  function resetGame() {
    setBoardState(Array(9).fill(''));
    setCurrentMove(0);
    isInit.current = false;
    setGameOver(false);
    setFirstFigure(Math.floor(Math.random() * 2) === 0);
    init();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={boardState} userIsNext={userIsNext} onPlay={handlePlay} />
        {gameOver && (
          <div className="game-controls">
            <button className="reset-button" onClick={resetGame}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function detectFull(squares) {
  return squares.filter((square) => square === '').length === 0;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] !== '' && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return [null, null];
}