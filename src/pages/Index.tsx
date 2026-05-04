import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import logo from "@/assets/numbersup-logo.png";
import { useNumbersUpGame } from "@/hooks/useNumbersUpGame";
import { Setup } from "@/components/game/Setup";
import { Board } from "@/components/game/Board";
import { PlayerBar } from "@/components/game/PlayerBar";
import { InstructionsDialog } from "@/components/game/InstructionsDialog";
import { WinOverlay } from "@/components/game/WinOverlay";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const Index = () => {
  const { t } = useTranslation();
  const game = useNumbersUpGame();
  const [showInfo, setShowInfo] = useState(false);

  const expected = game.progress + 1;
  const activePlayer = game.players[game.activeIdx];
  const winner = game.winnerIdx !== null ? game.players[game.winnerIdx] : null;

  return (
    <main
      className="min-h-screen px-4 py-4 sm:py-6"
      style={game.phase === "setup" ? { background: "hsl(var(--disc))" } : undefined}
    >
      {/* Header */}
      <header className="mx-auto mb-4 flex w-full max-w-2xl items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt={t("header.logoAlt")} className="h-10 w-auto sm:h-12" />
          <h1 className="sr-only">NumbersUp</h1>
        </div>
        <div className="flex items-center gap-2">
          {(game.phase === "playing" || game.phase === "won") && (
            <Button
              size="lg"
              onClick={game.newGameSamePlayers}
              aria-label={t("header.newGame")}
              className="bg-accent px-3 font-display text-base font-bold text-accent-foreground shadow-md hover:bg-accent/90 sm:text-lg"
            >
              {t("header.newGame")}
            </Button>
          )}
          <LanguageSwitcher />
          <Button
            size="lg"
            onClick={() => setShowInfo(true)}
            aria-label={t("header.instructions")}
            className="bg-accent px-3 font-display text-base font-bold text-accent-foreground shadow-md hover:bg-accent/90 sm:text-lg"
          >
            {t("header.instructions")}
          </Button>
        </div>
      </header>

      {game.phase === "setup" && <Setup onStart={game.startGame} />}

      {(game.phase === "playing" || game.phase === "won") && (
        <div className="animate-fade-in">
          <PlayerBar
            players={game.players}
            activeIdx={game.activeIdx}
            progress={game.progress}
          />

          <div className="mx-auto my-4 max-w-2xl text-center">
            <p className="font-display text-base text-muted-foreground sm:text-lg">
              <span className="font-semibold text-foreground">{activePlayer?.name}</span>
              {" — "}
              {t("game.flipVerb")}{" "}
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground sm:h-10 sm:w-10">
                {expected}
              </span>
            </p>
          </div>

          <Board
            board={game.board}
            onFlip={game.flipDisc}
            locked={game.locked}
            expected={expected}
          />

        </div>
      )}

      <InstructionsDialog open={showInfo} onOpenChange={setShowInfo} />

      {game.phase === "won" && winner && (
        <WinOverlay
          winnerName={winner.name}
          onPlayAgain={game.newGameSamePlayers}
          onNewPlayers={game.backToSetup}
        />
      )}
    </main>
  );
};

export default Index;
