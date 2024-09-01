"use client";

import { toast } from "sonner";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { CardWithList } from "@/types";
import { Button, Skeleton } from "@/components/ui";
import { useAction } from "@/hooks/use-action";
import { deleteCard, copyCard } from "@/actions";
import { useCardModal } from "@/hooks/use-card-modal";

interface ActionsProps {
  data: CardWithList;
}
function Actions({ data }: ActionsProps) {
  const params = useParams();
  const boardId = params.boardId as string;
  const queryClient = useQueryClient();
  const onClose = useCardModal((state) => state.onClose);

  const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["card", data.id],
        });
        toast.success(`Card ${data.title} deleted`);
        onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );
  const { execute: executeCopy, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["card", data.id],
        });
        toast.success(`Card "${data.title}" created`);
        onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const handleCopyCard = () => {
    executeCopy({ boardId, id: data.id });
  };

  const handleDeleteCard = () => {
    executeDelete({ boardId, id: data.id });
  };
  return (
    <div className="space-y-2 mt-1">
      <p className="text-sm font-semibold">Actions</p>
      <div className="flex md:flex-col gap-2">
        <Button
          onClick={handleCopyCard}
          size="sm"
          variant="outline"
          className="w-full"
          disabled={isLoadingCopy}
        >
          <Copy className="w-4 h-4 mr-2 text-slate-500" />
          Copy
        </Button>
        <Button
          onClick={handleDeleteCard}
          size="sm"
          variant="outline"
          className="w-full"
          disabled={isLoadingDelete}
        >
          <Trash className="w-4 h-4 mr-2 text-slate-500" />
          Delete
        </Button>
      </div>
    </div>
  );
}

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-slate-200" />
      <Skeleton className="w-full h-8 bg-slate-200" />
      <Skeleton className="w-full h-8 bg-slate-200" />
    </div>
  );
};
export default Actions;
