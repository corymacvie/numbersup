import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InstructionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InstructionsDialog = ({ open, onOpenChange }: InstructionsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">How to play</DialogTitle>
          <DialogDescription className="pt-2 text-base text-foreground">
            Flip discs in numerical order from 1 to 12. Get one wrong? Your turn ends.
            First to 12 wins!
          </DialogDescription>
        </DialogHeader>
        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
          <li>• Take turns flipping over discs.</li>
          <li>• Flip the correct next number? Keep going!</li>
          <li>• Flip out of order? All discs flip back and your turn ends.</li>
          <li>• First player to reach 12 wins.</li>
        </ul>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
