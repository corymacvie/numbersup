# NumbersUp — Plan

A pass-and-play game for 2–4 players. Take turns flipping discs to uncover numbers 1→12 in order. Wrong flip ends your turn; first to 12 wins.

## Screens & Flow

**1. Setup screen**
- NumbersUp logo at top.
- Choose number of players (2 / 3 / 4) via toggle buttons.
- Editable name fields per player (defaults: "Player 1", "Player 2", …).
- "Start Game" button.

**2. Game screen**
- Header: logo (left/center), info icon (top-right) opening instructions modal.
- Player bar: shows each player's name and current progress (next number they need). Active player highlighted with a colored ring/background.
- "Next number to flip: **N**" prompt above the board for the active player.
- Board: 3×4 grid of yellow discs. Logo side up by default; flipping reveals a large bold black number. Discs 6 and 9 have a small underline beneath the number.
- Discs already correctly flipped this turn stay face-up (number visible) until the turn ends successfully at 12 or a wrong flip occurs.
- Footer: "New Game" button, current turn indicator.

**3. Win screen / overlay**
- Confetti burst, "🎉 {Player} wins!" message, "Play Again" button (returns to setup with same players) and "New Players" button.

## Game Rules / Logic

- On game start, shuffle numbers 1–12 randomly across the 12 grid positions.
- Active player taps a disc → it flips with a 3D animation.
  - If it's the next expected number (starts at 1, then their personal progress+1): bounce effect, disc stays face-up, prompt updates to next number, player keeps going.
  - If wrong: red flash + shake on that disc, brief pause (~800ms) so everyone sees the mistake, then ALL discs flip back face-down. Turn passes to next player. Player's progress resets to 0 for next turn (they restart from 1 on their next turn).
- A player wins the moment they correctly flip 12.
- "Shuffled each new game" — positions are fixed during a single game so players can use memory across turns. Reshuffle only on "New Game".

## Design

- Disc face-down (logo side): yellow background (warm sunny yellow), NumbersUp logo centered, subtle border/shadow for a physical disc feel.
- Disc face-up (number side): same yellow, very large bold black number centered. 6 and 9 have a short black underline below for orientation.
- Active player highlight uses a brand accent (navy/indigo from logo).
- Smooth CSS 3D flip (rotateY, ~500ms), gentle scale-bounce on correct, shake + red flash on wrong, confetti on win.
- Responsive: grid is 4 cols × 3 rows on tablet/desktop; on narrow phones, discs scale down but layout stays 4×3 (to keep the game shape recognizable). Discs sized via aspect-square + clamp() so numbers stay readable.

## Instructions Modal

Triggered by info icon. Content: "Flip discs in numerical order from 1 to 12. Get one wrong? Your turn ends. First to 12 wins!" Plus a "Got it" close button.

## Technical Notes

- Single-page app, all state in React (no backend needed).
- New files:
  - `src/pages/Index.tsx` — replace placeholder with game container managing setup/playing/won phases.
  - `src/components/game/Setup.tsx` — player count + name entry.
  - `src/components/game/Board.tsx` — 3×4 grid.
  - `src/components/game/Disc.tsx` — individual disc with 3D flip (front = logo, back = number).
  - `src/components/game/PlayerBar.tsx` — players + progress + active highlight.
  - `src/components/game/InstructionsDialog.tsx` — uses existing shadcn Dialog.
  - `src/components/game/WinOverlay.tsx` — confetti + winner message.
  - `src/hooks/useNumbersUpGame.ts` — game state, shuffle, flip handler, turn logic.
- Assets: copy uploaded logo to `src/assets/numbersup-logo.png` and import.
- Design tokens: add yellow disc color, navy accent, and disc shadow to `index.css` and `tailwind.config.ts` (HSL semantic tokens, no hardcoded colors in components).
- Confetti: lightweight `canvas-confetti` package.
- Animations: 3D flip via Tailwind utilities + a small custom keyframe set (shake, bounce-correct) added to tailwind config.
- Accessibility: each disc is a `<button>` with aria-label ("Disc, face down" / "Disc showing 7"), keyboard activatable, disabled when not the active player's turn or already correctly flipped.
