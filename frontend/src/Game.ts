import { Chess } from 'chess.js';
import { BehaviorSubject } from 'rxjs';

const chess: Chess = new Chess();

export const gameSubject = new BehaviorSubject();

export const handleMove = (from, to) => {
  const promotions = chess.moves({ verbose: true }).filter((m) => m.promotion);
  console.log(promotions);
  if (promotions.some((p) => `${p.from}:${p.to}` === `${from}:${to}`)) {
    const pendingPromotion = { from, to, color: promotions[0].color };
    updateGame(pendingPromotion);
  }
  const { pendingPromotion } = gameSubject.getValue();

  if (!pendingPromotion) {
    move(from, to);
  }
};

export const resetGame = () => {
  chess.reset();
  updateGame();
};

const updateGame = (pendingPromotion) => {
  const isGameOver = chess.isGameOver();

  const newGame = {
    board: chess.board(),
    pendingPromotion,
    isGameOver,
    turn: chess.turn(),
    result: isGameOver ? getGameResult() : null,
  };
  gameSubject.next(newGame);
};

const getGameResult = () => {
  if (chess.isCheckmate()) {
    const winner = chess.turn() === 'w' ? 'BLACK' : 'WHITE';
    return `CHECKMATE - WINNER  - ${winner}`;
  } else if (chess.isDraw()) {
    let reason = '50 - MOVES - RULE';
    if (chess.isStalemate()) {
      reason = 'STALEMATE';
    } else if (chess.isThreefoldRepetition()) {
      reason = 'REPETITION';
    } else if (chess.isInsufficientMaterial()) {
      reason = 'INSUFFICIENT MATERIAL';
    }
    return `DRAW - ${reason}`;
  } else {
    return `UNKNOWN REASON`;
  }
};

export const initGame = () => {
  updateGame();
  chess.reset();
};

export const move = (from, to, promotion) => {
  let tempMove = { from, to };
  if (promotion) {
    tempMove.promotion = promotion;
  }

  const legalMove = chess.move(tempMove);
  if (legalMove) {
    updateGame();
  }
};
