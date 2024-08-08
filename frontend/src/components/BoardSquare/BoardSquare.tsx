import React, { useEffect, useState } from 'react';
import Square from './Square/Square';
import Piece from './Piece';
import { useDrop } from 'react-dnd';
import { handleMove } from '../../Game';
import { gameSubject, PendingPromotion } from '../../Game';
import Promote from '../Promote';

interface BoardSquareProps {
  piece: string | null;
  black: boolean;
  position: string;
  socket: SocketIOClient.Socket | null;  
}

const BoardSquare: React.FC<BoardSquareProps> = ({ piece, black, position, socket }) => {
  const [promotion, setPromotion] = useState<PendingPromotion | null>(null);

  const [, drop] = useDrop({
    accept: 'piece',
    drop: (item: { id: string }) => {
      const [fromPosition] = item.id.split('_');
      console.log('Handling move from', fromPosition, 'to', position);
      
      handleMove(fromPosition, position);

      if (socket) {
        console.log('Emitting move to socket:', { from: fromPosition, to: position });
        socket.emit('move', { from: fromPosition, to: position });
      } else {
        console.error('Socket not available');
      }
    },
  });

  useEffect(() => {
    const subscribe = gameSubject.subscribe(({ pendingPromotion }) =>
      pendingPromotion && pendingPromotion.to === position
        ? setPromotion(pendingPromotion)
        : setPromotion(null)
    );
    return () => subscribe.unsubscribe();
  }, [position]);

  return (
    <div className='board-square' ref={drop}>
      <Square black={black}>
        {promotion ? (
          <Promote promotion={promotion} />
        ) : piece ? (
          <Piece piece={piece} position={position} />
        ) : null}
      </Square>
    </div>
  );
};

export default BoardSquare;