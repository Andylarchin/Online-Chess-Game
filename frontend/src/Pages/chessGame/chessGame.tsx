import React, { useEffect, useState } from 'react';
import { gameSubject, initGame, resetGame } from '../../Game';
import './style.css';
import BoardSquare from '../../components/BoardSquare/BoardSquare';
import {
  ClockCircleOutlined,
  RetweetOutlined,
  SettingOutlined,
  SmileOutlined,
  SendOutlined,
  FlagOutlined,
  StepBackwardOutlined,
  LeftOutlined,
  StepForwardOutlined,
  CaretRightOutlined,
  RightOutlined,
  BookOutlined,
} from '@ant-design/icons';

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
        <div className='movesContainer'>
          <div className='topChat'>
            <p className='firstHalf'>Moves</p>
            <p className='secondHalf' style={{ fontSize: '25px' }}>
              <StepBackwardOutlined />
              <LeftOutlined />
              <StepForwardOutlined />
              <RightOutlined />
              <CaretRightOutlined />
            </p>
          </div>
          <p className='gameType'>
            <BookOutlined />
            Italian Game - Rouseeau Gabmit
          </p>
          <div className='movesList'>
            <div className='ownMove' style={{ marginTop: '15px' }}>
              <p>1.</p>
              <p>e4</p>
              <p>e5</p>
            </div>
            <div className='opponentMove'>
              <p>2.</p>
              <p>Nf3</p>
              <p>Nc6</p>
            </div>

            <div className='ownMove'>
              <p>3.</p>
              <p>Bc4</p>
              <p>f5</p>
            </div>
            <div className='opponentMove'>
              <p>4.</p>
              <p>c3</p>
              <p>fxe4</p>
            </div>

            <div className='ownMove'>
              <p>5.</p>
              <p>Ng1</p>
              <p>d5</p>
            </div>
            <div className='opponentMove'>
              <p>6.</p>
              <p>Bb3</p>
              <p>Nf6</p>
            </div>
          </div>
        </div>
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

        <div className='chatContainer'>
          <div className='opponentName'>
            <div
              style={{
                marginTop: '13%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '15px',
                color: '#e1e1e1',
              }}
            >
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS1P_ahGnzn0M0nsKJzASMplSBNbzh6528og&s'
                style={{ width: '45px', height: '45px' }}
              ></img>
              <p>Andylarchin</p>
            </div>
            <div
              style={{
                marginTop: '13%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '15px',
                color: '#e1e1e1',
              }}
            >
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS1P_ahGnzn0M0nsKJzASMplSBNbzh6528og&s'
                style={{ width: '45px', height: '45px' }}
              ></img>
              <p>ChessPlayerTwo</p>
            </div>
          </div>
          <div className='chat'>
            <div className='topChat'>
              <p className='firstHalf'>Chat</p>
              <p className='secondHalf'>
                <RetweetOutlined />
                <SettingOutlined />
              </p>
            </div>
            <div className='actualChat'>
              <p style={{ margin: '10px', color: 'grey' }}>
                Game has started with ChessPlayerTwo
              </p>

              <div className='message'>
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS1P_ahGnzn0M0nsKJzASMplSBNbzh6528og&s'
                  style={{ width: '45px', height: '45px' }}
                ></img>
                <p>Hello there!</p>
              </div>
              <div className='message' style={{ justifyContent: 'flex-end' }}>
                <p>Hello there!</p>
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS1P_ahGnzn0M0nsKJzASMplSBNbzh6528og&s'
                  style={{ width: '45px', height: '45px' }}
                ></img>
              </div>
            </div>
            <div className='sendMessage'>
              <div className='chatLog'>
                <p>Send Message</p>
                <SmileOutlined />
              </div>
              <button className='sendButton'>
                <SendOutlined />
              </button>
            </div>

            <div className='gameChoice'>
              <div className='choiceButton'>Draw</div>
              <div className='choiceButton2'>
                <FlagOutlined />
                Surrender
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChessGame;
