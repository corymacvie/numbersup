import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {t("instructions.title")}
          </DialogTitle>
          <DialogDescription className="pt-2 text-base text-foreground">
            {t("instructions.description")}
          </DialogDescription>
        </DialogHeader>
        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
          <li>• {t("instructions.rule1")}</li>
          <li>• {t("instructions.rule2")}</li>
          <li>• {t("instructions.rule3")}</li>
          <li>• {t("instructions.rule4")}</li>
        </ul>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            {t("instructions.gotIt")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
