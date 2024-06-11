import React, { useEffect, useState } from 'react';
import { gameSubject } from '../../Game';
import './style.css';
import BoardSquare from '../../components/BoardSquare/BoardSquare';

const ChessGame = () => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
    });
    return () => subscribe.unsubscribe();
  }, []);

  const getXYPosition = (i) => {
    const x = i % 8;
    const y = Math.abs(Math.floor(i / 8) - 7);
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
        <div className='board-container'>
          <div className='board'>
            {board.flat().map((piece, i) => {
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
      </div>
    </>
  );
};

export default ChessGame;
