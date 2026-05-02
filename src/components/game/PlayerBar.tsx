import { cn } from "@/lib/utils";
import type { Player } from "@/hooks/useNumbersUpGame";

interface PlayerBarProps {
  players: Player[];
  activeIdx: number;
  progress: number;
}

export const PlayerBar = ({ players, activeIdx, progress }: PlayerBarProps) => {
  return (
    <div className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-4">
      {players.map((p, i) => {
        const isActive = i === activeIdx;
        const reached = isActive ? progress : p.highest;
        return (
          <div
            key={p.id}
            className={cn(
              "flex flex-col items-center justify-center gap-1 rounded-2xl border-2 px-2 py-2 text-center transition-all duration-300",
              isActive
                ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.02]"
                : "border-border bg-card text-card-foreground",
            )}
          >
            <span className="w-full truncate font-display text-sm font-semibold sm:text-base">
              {p.name}
            </span>

            {isActive && (
              <div className="text-[10px] uppercase tracking-wide opacity-90">
                Your turn
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
