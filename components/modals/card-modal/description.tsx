"use client";

import { Skeleton } from "@/components/ui";
import { CardWithList } from "@/types";
import { AlignLeft } from "lucide-react";

interface DescriptionProps {
  data: CardWithList;
}
function Description({ data }: DescriptionProps) {
  return (
    <div className="flex items-start gap-x-3 w-full justify-start">
      <AlignLeft className="h-5 w-5 mt-0.5 text-slate-500" />
      <div className="w-full">
        <p className="font-semibold text-slate-700 mb-2">Description</p>
        <div
          role="button"
          className="min-h-[4.5rem] bg-slate-100 text-slate-500 text-sm font-medium py-3 px-3 rounded-md"
        >
          {data.description ?? "Add more details..."}
        </div>
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
