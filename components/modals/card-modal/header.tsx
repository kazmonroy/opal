"use client";

import { Layout } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { FormInput } from "@/components/form/form-input";
import { CardWithList } from "@/types";

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

export default Header;
