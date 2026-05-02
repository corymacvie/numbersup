import { cn } from "@/lib/utils";
import type { Player } from "@/hooks/useNumbersUpGame";

interface PlayerBarProps {
  players: Player[];
  activeIdx: number;
  progress: number;
}

export const PlayerBar = ({ players, activeIdx, progress }: PlayerBarProps) => {
  return (
    <div className="mx-auto grid w-full max-w-2xl gap-2 sm:grid-cols-2 md:grid-cols-4">
      {players.map((p, i) => {
        const isActive = i === activeIdx;
        const reached = isActive ? progress : p.highest;
        return (
          <div
            key={p.id}
            className={cn(
              "rounded-2xl border-2 px-3 py-2 transition-all duration-300",
              isActive
                ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.02]"
                : "border-border bg-card text-card-foreground",
            )}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate font-display text-sm font-semibold sm:text-base">
                {p.name}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 font-display text-xs font-bold",
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {reached}/12
              </span>
            </div>
            {isActive && (
              <div className="mt-1 text-xs opacity-90">Your turn</div>
            )}
          </div>
        );
      })}
    </div>
  );
};
