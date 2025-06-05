import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface DialogProps {
  title: string,
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog = ({
  title,
  isOpen,
  onClose,
  children,
}: DialogProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-30">
      <Card className="w-md p-4 relative">
        <Button
          className="absolute right-1 top-2"
          variant="ghost"
          size="icon"
          onClick={onClose}
        >
          <X />
        </Button>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {children}      
      </Card>
    </div>
  );
};

Dialog.displayName = 'Dialog';

export { Dialog }
