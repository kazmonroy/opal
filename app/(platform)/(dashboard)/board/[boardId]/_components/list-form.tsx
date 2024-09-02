"use client";

import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { ElementRef, useRef, useState } from "react";

import { Button } from "@/components/ui";
import ListWrapper from "./list-wrapper";
import { FormInput } from "@/components/form/form-input";
import FormSubmit from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/";

function ListForm() {
  const params = useParams();
  const router = useRouter();
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    execute({ title, boardId });
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-slate-50 space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            defaultValue=""
            placeholder="Enter list title"
            errors={fieldErrors}
            className="text-sm bg-slate-50 px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
          />
          <input
            type="submit"
            name="boardId"
            hidden
            defaultValue={params.boardId}
          />

          <FormSubmit variant="outline" className="w-full">
            Add list
          </FormSubmit>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <Button
        onClick={enableEditing}
        size="lg"
        variant="outline"
        className="justify-start w-full px-4 h-[3rem]"
      >
        <Plus className="w-4 h-4 mr-2" />
        Create list
      </Button>
    </ListWrapper>
  );
}

export default ListForm;
