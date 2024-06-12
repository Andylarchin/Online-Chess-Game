import React from 'react';
import Square from './BoardSquare/Square/Square';
import { move } from '../Game';

const Promote = ({ promotion: { from, to, color } }) => {
  const PromotionPieces = ['r', 'n', 'b', 'q'];

  return (
    <div className='board'>
      {PromotionPieces.map((p, i) => {
        return (
          <div key={i} className='promote-square'>
            <Square black={i % 3 === 0}>
              <div
                className='piece-container'
                onClick={() => {
                  move(from, to, p);
                }}
              >
                <img
                  src={`https://github.com/3stbn/react-chess/blob/starter/src/assets/${p}_${color}.png?raw=true`}
                  className='piece cursor-pointer'
                />
              </div>
            </Square>
          </div>
        );
      })}
    </div>
  );
};

export default Promote;
