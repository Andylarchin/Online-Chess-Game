import React, { useEffect, useState } from 'react';
import { gameSubject, initGame, resetGame } from '../../Game';
import './style.css';
import BoardSquare from '../../components/BoardSquare/BoardSquare';

const ChessGame = () => {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [turn, setTurn] = useState();
  const [currentBoard, setCurrentBoard] = useState([]);

  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);
    });
    return () => subscribe.unsubscribe();
  }, []);

  useEffect(() => {
    setCurrentBoard(turn === 'w' ? board.flat() : board.flat().reverse());
  }, [board, turn]);

  const getXYPosition = (i) => {
    const x = turn === 'w' ? i % 8 : Math.abs((i % 8) - 7);
    const y =
      turn === 'w' ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8);
    return { x, y };
  };

  const isBlack = (i) => {
    const { x, y } = getXYPosition(i);
    return (x + y) % 2 === 1;
  };

  const getPosition = (i) => {
    const { x, y } = getXYPosition(i);
    const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][x];
    return `${letter}${y + 1}`;
  };

  return (
    <>
      <div className='container'>
        {isGameOver && (
          <div>
            <h2 className='vertical-text'>
              GAME OVER
              <button onClick={resetGame}>
                <span className='vertifcal-text'>NEW GAME</span>
              </button>
            </h2>
          </div>
        )}
        <div className='board-container'>
          <div className='board'>
            {currentBoard.flat().map((piece, i) => {
              return (
                <div key={i} className='square'>
                  <BoardSquare
                    piece={piece}
                    black={isBlack(i)}
                    position={getPosition(i)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {result && <p className='vertical-text'>{result}</p>}
      </div>
    </>
  );
};

export default ChessGame;
