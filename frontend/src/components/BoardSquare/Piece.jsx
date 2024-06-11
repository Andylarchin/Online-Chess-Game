import React from 'react';
import { useDrag, DragPreviewImage } from 'react-dnd';

const Piece = ({ piece: { type, color }, position }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { id: `${position}_${type}_${color}` },
    type: 'piece',
    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() };
    },
  });

  return (
    <>
      <DragPreviewImage
        connect={preview}
        src={`https://github.com/3stbn/react-chess/blob/starter/src/assets/${type}_${color}.png?raw=true`}
      />
      <div
        className='piece-container'
        ref={drag}
        style={{ opacity: isDragging ? 0 : 1 }}
      >
        <img
          src={`https://github.com/3stbn/react-chess/blob/starter/src/assets/${type}_${color}.png?raw=true`}
          className='piece'
        />
      </div>
    </>
  );
};

export default Piece;
6;
