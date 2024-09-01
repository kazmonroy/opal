"use client";

import { Skeleton } from "@/components/ui";
import { CardWithList } from "@/types";

interface DescriptionProps {
  data: CardWithList;
}
function Description({ data }: DescriptionProps) {
  return <div>{data.description}</div>;
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-slate-200" />
      <div className="w-full">
        <Skeleton className="h-26 w-24 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[4.5rem] bg-neutral-200" />
      </div>
    </div>
  );
};

export default Description;
