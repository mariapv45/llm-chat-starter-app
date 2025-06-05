import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SquarePen, Play, Trash2 } from "lucide-react";

interface PromptTileProps {
  title: string;
  content: string;
  onEdit: () => void;
  onUse: () => void;
  onRemove: () => void;
}

export const PromptTile = ({
  title,
  content,
  onEdit,
  onUse,
  onRemove,
}: PromptTileProps) => {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {content}
        </p>
        <div className="flex gap-2 pt-2">
        <Button
            variant="default"
            size="sm"
            onClick={onUse}
            className="flex-1"
          >
            <Play className="h-4 w-4" />
            Use
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex-1"
          >
            <SquarePen className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onRemove}
            className="flex-1"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};
