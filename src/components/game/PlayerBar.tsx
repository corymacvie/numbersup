import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import type { Player } from "@/hooks/useNumbersUpGame";

interface PlayerBarProps {
  players: Player[];
  activeIdx: number;
  progress: number;
}

export const PlayerBar = ({ players, activeIdx }: PlayerBarProps) => {
  const { t } = useTranslation();
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-wrap justify-center gap-2">
      {players.map((p, i) => {
        const isActive = i === activeIdx;
        return (
          <div
            key={p.id}
            className={cn(
              "flex w-[calc(33.333%-0.5rem)] flex-col items-center justify-center gap-1 rounded-2xl border-2 px-2 py-2 text-center transition-all duration-300 md:w-[calc(16.666%-0.667rem)]",
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
                {t("game.yourTurn")}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
