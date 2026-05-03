import { cn } from "@/lib/utils";
import logo from "@/assets/numbersup-logo.png";
import type { DiscState } from "@/hooks/useNumbersUpGame";

interface DiscProps {
  disc: DiscState;
  onClick: () => void;
  disabled: boolean;
  expected: number;
}

export const Disc = ({ disc, onClick, disabled }: DiscProps) => {
  const { faceUp, number, status } = disc;
  const showUnderline = false;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || faceUp}
      aria-label={faceUp ? `Disc showing ${number}` : "Face-down disc"}
      className={cn(
        "perspective-1000 group aspect-square w-full select-none rounded-full",
        "transition-transform duration-200",
        !disabled && !faceUp && "hover:-translate-y-1 active:translate-y-0 cursor-pointer",
        disabled && !faceUp && "cursor-not-allowed opacity-80",
        status === "wrong" && "animate-shake",
        status === "correct" && "animate-bounce-pop",
      )}
    >
      <div
        className={cn(
          "preserve-3d relative h-full w-full rounded-full transition-transform duration-500 ease-out",
          faceUp && "rotate-y-180",
        )}
      >
        {/* Face down — logo side */}
        <div
          className={cn(
            "backface-hidden absolute inset-0 flex items-center justify-center rounded-full bg-disc shadow-disc",
            "border-[3px] border-disc-edge/40",
          )}
          style={{ backgroundColor: "hsl(var(--disc))" }}
        >
          <img
            src={logo}
            alt=""
            className="h-[70%] w-[70%] object-contain"
            draggable={false}
          />
        </div>

        {/* Face up — number side */}
        <div
          className={cn(
            "backface-hidden rotate-y-180 absolute inset-0 flex flex-col items-center justify-center rounded-full",
            "border-[3px]",
            status === "wrong"
              ? "bg-destructive/90 border-destructive text-destructive-foreground shadow-disc-wrong"
              : "bg-disc border-disc-edge/40 text-disc-number shadow-disc",
          )}
        >
          <span
            className="font-display font-bold leading-none"
            style={{ fontSize: "clamp(2rem, 9vw, 5rem)" }}
          >
            {number}
          </span>
          {showUnderline && (
            <span
              className={cn(
                "mt-1 block rounded-full",
                status === "wrong" ? "bg-destructive-foreground" : "bg-disc-number",
              )}
              style={{ width: "clamp(1.25rem, 4.5vw, 2.5rem)", height: "clamp(3px, 0.6vw, 5px)" }}
            />
          )}
        </div>
      </div>
    </button>
  );
};
