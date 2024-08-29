"use client";

import { toast } from "sonner";
import { List } from "@prisma/client";
import { useEventListener } from "usehooks-ts";
import { ElementRef, useRef, useState } from "react";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { updateList } from "@/actions";
import ListOptions from "./list-options";

interface ListHeaderProps {
  onAddCard: () => void;
  data: List;
}

function ListHeader({ data, onAddCard }: ListHeaderProps) {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to ${data.title}`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
      disableEditing();
    }
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({ title, id, boardId });
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2 ">
      {isEditing ? (
        <form
          ref={formRef}
          action={onSubmit}
          className="flex-1 rounded-sm text-sm h-7 font-medium  "
        >
          <input type="text" hidden id="id" name="id" defaultValue={data.id} />
          <input
            type="text"
            hidden
            id="boardId"
            name="boardId"
            defaultValue={data.boardId}
          />
          <FormInput
            ref={inputRef}
            id="title"
            placeholder="Enter list title"
            onBlur={onBlur}
            defaultValue={title}
            errors={fieldErrors}
            className="font-medium border-transparent hover:border-input focus:border-input bg-transparent focus:bg-slate-50  transition truncate"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium cursor-pointer"
        >
          {title}
        </div>
      )}
      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  );
}

export default ListHeader;
