import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import logo from "@/assets/numbersup-logo.png";

interface SetupProps {
  onStart: (names: string[]) => void;
}

export const Setup = ({ onStart }: SetupProps) => {
  const { t } = useTranslation();
  const [count, setCount] = useState(2);
  const defaultName = (i: number) => t("setup.playerDefault", { n: i + 1 });
  const [names, setNames] = useState<string[]>(() =>
    Array.from({ length: 6 }, (_, i) => `__default_${i}`),
  );

  // Replace any default placeholders when language changes
  useEffect(() => {
    setNames((prev) =>
      prev.map((n, i) => {
        if (n.startsWith("__default_") || n.trim() === "") return defaultName(i);
        // If it matches a previously translated default, refresh it
        return n;
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const updateName = (i: number, value: string) => {
    setNames((prev) => prev.map((n, idx) => (idx === i ? value : n)));
  };

  const handleFocus = (i: number) => {
    setNames((prev) =>
      prev.map((n, idx) => (idx === i && n === defaultName(i) ? "" : n)),
    );
  };

  const handleBlur = (i: number) => {
    setNames((prev) =>
      prev.map((n, idx) => (idx === i && n.trim() === "" ? defaultName(i) : n)),
    );
  };

  return (
    <div className="mx-auto w-full max-w-md animate-fade-in">
      <div className="mb-8 flex flex-col items-center text-center">
        <img src={logo} alt="NumbersUp" className="mb-2 h-32 w-auto" />
        <p className="text-muted-foreground">{t("setup.tagline")}</p>
      </div>

      <div className="rounded-3xl border-2 border-border bg-card p-6 shadow-lg">
        <Label className="mb-2 block font-display text-base">
          {t("setup.numberOfPlayers")}
        </Label>
        <div className="mb-6 grid grid-cols-5 gap-2">
          {[2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setCount(n)}
              className={cn(
                "rounded-xl border-2 py-3 font-display text-lg font-bold transition-all",
                count === n
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-background hover:border-primary/40",
              )}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i}>
              <Label htmlFor={`player-${i}`} className="text-xs text-muted-foreground">
                {t("setup.playerLabel", { n: i + 1 })}
              </Label>
              <Input
                id={`player-${i}`}
                value={names[i]?.startsWith("__default_") ? defaultName(i) : (names[i] ?? "")}
                onChange={(e) => updateName(i, e.target.value)}
                onFocus={() => handleFocus(i)}
                onBlur={() => handleBlur(i)}
                maxLength={20}
                className="mt-1"
              />
            </div>
          ))}
        </div>

        <Button
          size="lg"
          className="mt-6 w-full font-display text-lg"
          onClick={() =>
            onStart(
              names
                .slice(0, count)
                .map((n, i) => (n.startsWith("__default_") ? defaultName(i) : n)),
            )
          }
        >
          {t("setup.startGame")}
        </Button>
      </div>

      <p className="mt-4 text-center font-display text-sm text-muted-foreground">
        {t("setup.ageLine")}
      </p>
    </div>
  );
};
