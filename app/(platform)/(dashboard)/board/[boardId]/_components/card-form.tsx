import { Button } from "@/components/ui";
import { Plus } from "lucide-react";
import { forwardRef } from "react";

interface CardFormProps {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          size="sm"
          variant="ghost"
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
