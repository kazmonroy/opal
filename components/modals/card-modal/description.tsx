"use client";

import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Skeleton } from "@/components/ui";
import { CardWithList } from "@/types";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormTextarea } from "@/components/form/form-textarea";
import FormSubmit from "@/components/form/form-submit";

interface DescriptionProps {
  data: CardWithList;
}
function Description({ data }: DescriptionProps) {
  const queryClient = useQueryClient();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
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

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    if (description === data.description) {
      disableEditing();
    }

    // execute({ id: data.id, boardId, description });
  };

  return (
    <div className="flex items-start gap-x-3 w-full justify-start">
      <AlignLeft className="h-5 w-5 mt-0.5 text-slate-500" />
      <div className="w-full">
        <p className="font-semibold text-slate-700 mb-2">Description</p>

        {isEditing ? (
          <form action="" ref={formRef} className="space-y-2">
            <FormTextarea
              id="description"
              className="w-full mt-2"
              placeholder="Add more details..."
              defaultValue={data.description ?? undefined}
            />
            <div className="w-full flex justify-end items-center gap-x-2 ">
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
              <FormSubmit>Save</FormSubmit>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[4.5rem] bg-slate-100 text-slate-500 text-sm font-medium py-3 px-3 rounded-md"
          >
            {data.description ?? "Add more details..."}
          </div>
        )}
      </div>
    </div>
  );
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-slate-200" />
      <div className="w-full">
        <Skeleton className="h-26 w-24 bg-neutral-200" />
        <Skeleton className="w-full h-[4.5rem] bg-neutral-200" />
      </div>
    </div>
  );
};

export default Description;
