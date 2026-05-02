import { Disc } from "./Disc";
import type { DiscState } from "@/hooks/useNumbersUpGame";

interface BoardProps {
  board: DiscState[];
  onFlip: (idx: number) => void;
  locked: boolean;
  expected: number;
}

export const Board = ({ board, onFlip, locked, expected }: BoardProps) => {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="grid grid-cols-3 grid-rows-4 sm:grid-cols-4 sm:grid-rows-3 gap-3 sm:gap-4 md:gap-5">
        {board.map((disc, i) => (
          <Disc
            key={i}
            disc={disc}
            onClick={() => onFlip(i)}
            disabled={locked}
            expected={expected}
          />
        ))}
      </div>
    </div>
  );
};
