import React from 'react';
import Square from './Square/Square';
import Piece from './Piece';
import { useDrop } from 'react-dnd';
import { move } from '../../Game';

const BoardSquare = ({ piece, black, position }) => {
  const [, drop] = useDrop({
    accept: 'piece',
    drop: (item) => {
      const [fromPosition] = item.id.split('_');
      move(fromPosition, position);
    },
  });

  return (
    <div className='board-square' ref={drop}>
      <Square black={black}>
        {piece && <Piece piece={piece} position={position} />}
      </Square>
    </div>
  );
};

export default BoardSquare;
