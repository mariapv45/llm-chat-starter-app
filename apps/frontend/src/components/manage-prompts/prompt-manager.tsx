import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PromptForm } from "./promp-form";
import { PromptTile } from "./prompt-tile";

import { usePrompts } from "@/store/prompts";
import { useMessages } from "@/store/messages";

import type { Prompt } from "@/types/propmt";
import { Dialog } from "../ui/dialog";

export const PromptManager = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [editedPromptId, setEditedPromptId] = useState<string | null>(null);
  const [removePromptId, setRemovePromptId] = useState<string | null>(null);

  const { prompts, removePrompt } = usePrompts();
  const { setInput } = useMessages();

  const handleEditPrompt = (prompt: Prompt) => {
    setEditedPromptId(prompt.id);
    setIsEditMode(true);
  }

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setIsEditMode(false);
  }

  const handleRemovePrompt = (id: string) => {
    // open confirm remove dialog
    setIsDialogOpen(true);
    setRemovePromptId(id);
  }

  const onConfirmRemovePrompt = (id: string) => {
    // remove prompt from store
    removePrompt(id);
    // clear prompt to remove
    setRemovePromptId(null);
    // close dialog
    setIsDialogOpen(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Manage Prompts</h2>
      <Button
        className="w-3/5 p-4"
        variant="outline"
        size="sm"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        <Plus />
        New Prompt
      </Button>

      {isFormVisible && (
        <PromptForm
          handleCloseForm={handleCloseForm}
        />
      )}

      {prompts.map((prompt) => (
          editedPromptId === prompt.id && isEditMode ? (
            <PromptForm
              key={prompt.id}
              prompt={prompt}
              handleCloseForm={handleCloseForm}
            />
          ) : (
            <PromptTile
              key={prompt.id}
              title={prompt.title}
              content={prompt.content}
              onEdit={() => handleEditPrompt(prompt)}
              onUse={() => setInput(prompt.content)}
              onRemove={() => handleRemovePrompt(prompt.id)}
            />
          )
        ))}

      <Dialog
        title={"Remove Prompt"}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <p className="text-sm text-muted-foreground mb-4">
          Are you sure you want to delete this prompt? <br />
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2 border-t pt-4">
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => removePromptId && onConfirmRemovePrompt(removePromptId)}
          >
            Delete
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
