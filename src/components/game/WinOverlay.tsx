import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

interface WinOverlayProps {
  winnerName: string;
  onPlayAgain: () => void;
  onNewPlayers: () => void;
}

export const WinOverlay = ({ winnerName, onPlayAgain, onNewPlayers }: WinOverlayProps) => {
  useEffect(() => {
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.7 },
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
      });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl border-2 border-border bg-card p-8 text-center shadow-2xl animate-scale-in">
        <div className="mb-2 text-5xl">🎉</div>
        <h2 className="font-display text-3xl font-bold text-foreground">
          {winnerName} wins!
        </h2>
        <p className="mt-2 text-muted-foreground">Reached 12 first. Nice work!</p>
        <div className="mt-6 flex flex-col gap-2">
          <Button size="lg" className="w-full font-display" onClick={onPlayAgain}>
            Play Again
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full font-display"
            onClick={onNewPlayers}
          >
            New Players
          </Button>
        </div>
      </div>
    </div>
  );
};
