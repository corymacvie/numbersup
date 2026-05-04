# Add Internationalization (i18n)

Add multi-language support with auto-detection of the user's browser language and a language picker (icon-only globe dropdown) placed left of the Instructions button.

## Languages
- English (en) — default/fallback
- Spanish (es)
- Chinese — Simplified (zh)
- Hindi (hi)
- Arabic (ar) — with right-to-left (RTL) text direction
- French (fr)

## Approach

Use **react-i18next** + **i18next-browser-languagedetector** (industry standard, lightweight, integrates cleanly with React).

### 1. Install dependencies
- `i18next`
- `react-i18next`
- `i18next-browser-languagedetector`

### 2. Create i18n setup
- New file `src/i18n/index.ts` — initializes i18next with language detector (reads `localStorage` first, then `navigator.language`), fallback `en`, and inline resource bundles.
- New folder `src/i18n/locales/` with `en.json`, `es.json`, `zh.json`, `hi.json`, `ar.json`, `fr.json` containing all UI strings.
- Import `./i18n` from `src/main.tsx` so it initializes before React renders.

### 3. Strings to translate
Collected from the codebase:

- **Setup.tsx**: "Flip discs 1 → 12 in order. First to 12 wins!", "Number of players", "Player {n}", "Start Game", "Age 2+ | 2+ Players | 2+ Min Play"
- **Index.tsx**: "New Game", "Instructions", "{name} — flip", aria labels
- **PlayerBar.tsx**: "Your turn"
- **Disc.tsx**: aria labels "Disc showing {n}", "Face-down disc"
- **InstructionsDialog.tsx**: title "How to play", description, the 4 bullet rules, "Got it"
- **WinOverlay.tsx**: "{name} wins!", "Reached 12 first. Nice work!", "Play Again", "New Players"

Default `Player N` placeholder names will use the translated word for "Player".

### 4. Language switcher component
New file `src/components/LanguageSwitcher.tsx`:
- A `DropdownMenu` (already in project) triggered by an icon-only button using the `Globe` icon from `lucide-react`.
- Same visual style as the Instructions button (accent background, large size) so it sits nicely next to it.
- Lists all 6 languages by their **native name** (English, Español, 中文, हिन्दी, العربية, Français) with a check mark on the current selection.
- On select: calls `i18n.changeLanguage(code)`, persists to localStorage (handled by detector), and updates `document.documentElement.lang` and `dir` (`rtl` for Arabic, otherwise `ltr`).

### 5. Wire into header
In `src/pages/Index.tsx`, place `<LanguageSwitcher />` immediately to the left of the Instructions button inside the existing right-side flex group. Replace all hard-coded strings via `useTranslation()`.

### 6. RTL handling
A small effect in the i18n setup updates `<html dir>` whenever language changes. Tailwind's logical layout works in both directions for the current UI, so no additional CSS changes are required.

## Files to add
- `src/i18n/index.ts`
- `src/i18n/locales/{en,es,zh,hi,ar,fr}.json`
- `src/components/LanguageSwitcher.tsx`

## Files to edit
- `src/main.tsx` — import i18n setup
- `src/pages/Index.tsx` — add switcher, translate strings
- `src/components/game/Setup.tsx` — translate
- `src/components/game/PlayerBar.tsx` — translate
- `src/components/game/InstructionsDialog.tsx` — translate
- `src/components/game/WinOverlay.tsx` — translate
- `src/components/game/Disc.tsx` — translate aria labels
