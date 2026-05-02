import { useCallback, useState } from "react";

export type Phase = "setup" | "playing" | "won";

export interface Player {
  id: number;
  name: string;
  highest: number; // highest number they have ever reached
}

export interface DiscState {
  number: number;
  faceUp: boolean;
  status: "idle" | "correct" | "wrong";
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildBoard = (): DiscState[] =>
  shuffle(Array.from({ length: 12 }, (_, i) => i + 1)).map((n) => ({
    number: n,
    faceUp: false,
    status: "idle" as const,
  }));

export const useNumbersUpGame = () => {
  const [phase, setPhase] = useState<Phase>("setup");
  const [players, setPlayers] = useState<Player[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [board, setBoard] = useState<DiscState[]>([]);
  const [progress, setProgress] = useState(0); // last correct number this turn
  const [winnerIdx, setWinnerIdx] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  const startGame = useCallback((names: string[]) => {
    setPlayers(names.map((name, id) => ({ id, name: name.trim() || `Player ${id + 1}`, highest: 0 })));
    setBoard(buildBoard());
    setActiveIdx(0);
    setProgress(0);
    setWinnerIdx(null);
    setLocked(false);
    setPhase("playing");
  }, []);

  const newGameSamePlayers = useCallback(() => {
    setBoard(buildBoard());
    setPlayers((p) => p.map((pl) => ({ ...pl, highest: 0 })));
    setActiveIdx(0);
    setProgress(0);
    setWinnerIdx(null);
    setLocked(false);
    setPhase("playing");
  }, []);

  const backToSetup = useCallback(() => {
    setPhase("setup");
  }, []);

  const flipDisc = useCallback(
    (idx: number) => {
      if (locked) return;
      const disc = board[idx];
      if (!disc || disc.faceUp) return;

      const expected = progress + 1;
      if (disc.number === expected) {
        const next = board.map((d, i) =>
          i === idx ? { ...d, faceUp: true, status: "correct" as const } : d,
        );
        setBoard(next);
        const newProgress = expected;
        setProgress(newProgress);
        setPlayers((ps) =>
          ps.map((p, i) => (i === activeIdx ? { ...p, highest: Math.max(p.highest, newProgress) } : p)),
        );
        if (newProgress === 12) {
          setLocked(true);
          setWinnerIdx(activeIdx);
          setTimeout(() => setPhase("won"), 700);
        }
      } else {
        // wrong flip
        setLocked(true);
        const next = board.map((d, i) =>
          i === idx ? { ...d, faceUp: true, status: "wrong" as const } : d,
        );
        setBoard(next);
        setTimeout(() => {
          setBoard((b) => b.map((d) => ({ ...d, faceUp: false, status: "idle" })));
          setProgress(0);
          setActiveIdx((i) => (i + 1) % players.length);
          setLocked(false);
        }, 1400);
      }
    },
    [board, locked, progress, activeIdx, players.length],
  );

  return {
    phase,
    players,
    activeIdx,
    board,
    progress,
    winnerIdx,
    locked,
    startGame,
    newGameSamePlayers,
    backToSetup,
    flipDisc,
  };
};
