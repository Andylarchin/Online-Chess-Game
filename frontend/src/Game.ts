import { Chess, Move as ChessMove } from 'chess.js';
import { BehaviorSubject } from 'rxjs';

const chess = new Chess();

interface Game {
  board: Array<Array<{ type: string; color: string } | null>>;
  pendingPromotion?: Promotion | null;
  isGameOver: boolean;
  turn: 'w' | 'b';
  result: string | null;
}

interface Promotion {
  from: string;
  to: string;
  color: 'w' | 'b';
}

interface Moves {
  fromMove: { from: string };
  toMove: { to: string };
}

export const gameSubject = new BehaviorSubject<Game | undefined>(undefined);

export const handleMove = (from: string, to: string): void => {
  const promotions = chess
    .moves({ verbose: true })
    .filter((m: ChessMove) => m.promotion);
  console.log(promotions);
  if (
    promotions.some((p: ChessMove) => `${p.from}:${p.to}` === `${from}:${to}`)
  ) {
    const pendingPromotion: Promotion = {
      from,
      to,
      color: promotions[0].color,
    };
    updateGame(pendingPromotion);
  }

  const game = gameSubject.getValue();
  if (game && !game.pendingPromotion) {
    move(from, to);
  }
};

export const resetGame = (): void => {
  chess.reset();
  updateGame();
};

const updateGame = (pendingPromotion?: Promotion | null): void => {
  const isGameOver = chess.isGameOver();

  const newGame: Game = {
    board: chess.board(),
    pendingPromotion: pendingPromotion || null,
    isGameOver,
    turn: chess.turn(),
    result: isGameOver ? getGameResult() : null,
  };
  gameSubject.next(newGame);
};

const getGameResult = (): string => {
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

export const initGame = (): void => {
  chess.reset();
  updateGame();
};

let fromMove: { from: string };
let toMove: { to: string };

export const move = (from: string, to: string, promotion?: string, socket?: SocketIOClient.Socket): void => {
  const tempMove = { from, to, promotion };

  const legalMove = chess.move(tempMove);
  if (legalMove) {
    updateGame();

    if (socket) {
      socket.emit('move', { from, to });
    }
  }

  fromMove = { from };
  toMove = { to };
};

export const getMoves = (): Moves => {
  return { fromMove, toMove };
};
