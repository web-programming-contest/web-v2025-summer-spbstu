import { useState, useEffect, useRef } from 'react';
import './Game.css';

function Square({ value, onSquareClick, ifInWinCombo }) {
  return (
    <button className={ifInWinCombo ? "square win-highlight" : "square"} onClick={onSquareClick}>
      {value !== '' ? <img className="figure" src={value === 'X' ? '/images/cross.png' : value === 'O' ? 'images/circle.png' : null}></img> : <></>}
    </button>
  );
}

function Board({ xIsNext, squares, userIsNext, userFigure, nickname, opponent, onPlay, gameMode, gameID, socket }) {
  function handleClick(i) {
    if (calculateWinner(squares)[0] || squares[i] || !userIsNext || opponent === '') {
      return;
    }

    if (gameMode === 'player') {
      socket.emit('game move', gameID, i, userFigure);
    } else {
      const nextSquares = squares.slice();

      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      onPlay(nextSquares);
    }
  }

  useEffect(() => {
    socket.on('game move responce', (id, i, figure) => {
      if (id !== gameID) {
        return;
      }
      squares[i] = figure;
      onPlay(squares);
    });

    return () => {
      socket.off('game move responce');
    }
  });

  const [winner, combo] = calculateWinner(squares);
  const tie = detectFull(squares);
  let status;
  if (winner) {
    if (winner === userFigure) {
      status = 'Winner: ' + nickname;
    } else {
      status = 'Winner: ' + opponent;
    }
  } else if (tie) {
    status = 'Tie!';
  } else {
    const xUser = (userFigure === 'X' ? nickname : opponent);
    const oUser = (userFigure === 'O' ? nickname : opponent);
    status = 'Next player: ' + (xIsNext ? xUser : oUser);
  }

  if (opponent === '') {
    status = 'Wait for another player...';
  }

  let buttonInCombo = Array(9).fill(false);

  if (winner) {
    for (let i = 0; i < 9; i++) {
        buttonInCombo[i] = combo.includes(i);    
    }
  }

  return (
    <>
      <div className={winner != null ? "status winner" : tie ? "status tie" : "status"}>
        {status}
      </div>
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

export default function Game({gameMode, nickname, onReturnToMainMenu, socket, id}) {
  const [boardState, setBoardState] = useState(Array(9).fill(''));
  const [currentMove, setCurrentMove] = useState(0);
  const [userFigure, setUserFigure] = useState('');
  const [xIsFirst, setFirstFigure] = useState(Math.floor(Math.random() * 2) === 0);
  const [gameOver, setGameOver] = useState(false);
  const [opponent, setOpponent] = useState('');
  const [isCreator, setIsCreator] = useState(false);
  const [resetBtnDisabled, setResetBtnDisabled] = useState(false);
  const isInit = useRef(false);
  const xIsNext = (currentMove % 2 === 0 && xIsFirst) || (currentMove % 2 === 1 && !xIsFirst);
  const userIsNext = userFigure === '' ? true : ((userFigure === 'X' && xIsNext) || (userFigure === 'O' && !xIsNext));

  console.log(id);

  useEffect(() => {
    socket.on('opponent connect', (gameID, opponent) => {
      if (gameID !== id) {
        return;
      }
      if (isCreator) {
        setOpponent(opponent);
        if (id === -1) {
          console.log("Id is bad?!");
        } else {
          console.log("Opponent connected!");
          socket.emit('init request', id, opponent);
        }
      }
    });

    socket.on('init responce', (xIsFirst, userFigure, opponent) => {
      console.log("Init responce!");
      setBoardState(Array(9).fill(''));
      setUserFigure(userFigure);
      setFirstFigure(xIsFirst);
      setOpponent(opponent);
      setResetBtnDisabled(false);
    });

    socket.on('re-init approved', (gameID) => {
      if (id === -1 || id !== gameID) {
        return;
      }
      socket.emit('re-init request', id, isCreator);
      setTimeout(() => {
        setCurrentMove(0);
        setGameOver(false);
      }, 500);
    });

    function localResetGame() {
      setOpponent('');
      setBoardState(Array(9).fill(''));
      setCurrentMove(0);
      setGameOver(false);
      setResetBtnDisabled(false);
    }

    socket.on('give creator', (gameID) => {
      if (id !== gameID) {
        return;
      }
      setIsCreator(true);
      localResetGame();
    });

    socket.on('player left', (gameID) => {
      if (gameID === id) {
        localResetGame();
      }
    });

    return () => {
      socket.off('init responce');
      socket.off('re-init approved');
      socket.off('opponent connect');
      socket.off('give creator');
      socket.off('player left');
    };
  });

  useEffect(() => {
    const handleBeforeUnload = (_) => {
      socket.emit('leave', id, nickname);
      return;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });


  useEffect(() => {
    if (isInit.current) {
      return;
    }
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
    } else if (gameMode === 'player') {
      setIsCreator(id === -1);
      if (id !== -1) {
        socket.emit('init request joined', id, nickname);
      }
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
    if (gameMode === 'computer') {
      setBoardState(Array(9).fill(''));
      setCurrentMove(0);
      setGameOver(false);
      isInit.current = false;
      setFirstFigure(Math.floor(Math.random() * 2) === 0);
      init();
    } else if (gameMode === 'player') {
      setResetBtnDisabled(true);
      socket.emit('re-init button pressed', id, isCreator);
    }
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={boardState} userIsNext={userIsNext} socket={socket} gameID = {id} gameMode={gameMode}
               userFigure={userFigure} nickname={nickname} opponent={gameMode === 'computer' ? 'AI' : opponent} onPlay={handlePlay} />

        <div className="game-controls">
          {gameOver && (
            <button className="reset-button" onClick={resetGame} disabled={resetBtnDisabled}>
              <span className='reset-text'>Play Again</span>
            </button>
          )}
        </div>

        <div className="exit-container">
          <button 
            className="exit-button"
            onClick={onReturnToMainMenu}
          >
            <span className="exit-text">Main Menu</span>
          </button>
        </div>

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