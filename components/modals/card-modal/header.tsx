"use client";

import { Layout } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { FormInput } from "@/components/form/form-input";
import { CardWithList } from "@/types";
import { Skeleton } from "@/components/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions";
import { toast } from "sonner";

interface HeaderProps {
  data: CardWithList;
}
function Header({ data }: HeaderProps) {
  const { title, list } = data;
  const inputRef = useRef<ElementRef<"input">>(null);
  const queryClient = useQueryClient();
  const params = useParams();
  const [headerTitle, setHeaderTitle] = useState(title);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`Card renamed to ${data.title}`);
      setHeaderTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    if (title === headerTitle) {
      return;
    }

    execute({ id: data.id, boardId, title });
  };

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-5 w-5 mt-1 text-slate-500" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            defaultValue={headerTitle}
            onBlur={onBlur}
            errors={fieldErrors}
            className="font-semibold text-xl px-1 text-slate-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-slate-50 focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{list.title}</span>
        </p>
      </div>
    </div>
  );
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6 ">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};

export default Header;
