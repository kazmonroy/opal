"use client";

import { Layout } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { FormInput } from "@/components/form/form-input";
import { CardWithList } from "@/types";
import { Skeleton } from "@/components/ui";

interface HeaderProps {
  data: CardWithList;
}
function Header({ data }: HeaderProps) {
  const { title } = data;
  const inputRef = useRef<ElementRef<"input">>(null);
  const [headerTitle, setHeaderTitle] = useState(title);

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-4 w-4 mt-1 text-slate-700 " />
      <div className="w-full">
        <form action="">
          <FormInput
            id="title"
            ref={inputRef}
            defaultValue={headerTitle}
            className="font-semibold text-xl px-1 text-slate-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-slate-50 focus-visible:border-input mb-0.5 truncate"
          />
        </form>
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
