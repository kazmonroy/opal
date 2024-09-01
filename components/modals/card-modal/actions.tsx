"use client";

import { Copy, Trash } from "lucide-react";
import { CardWithList } from "@/types";
import { Button, Skeleton } from "@/components/ui";

interface ActionsProps {
  data: CardWithList;
}
function Actions({ data }: ActionsProps) {
  return (
    <div className="space-y-2 mt-1">
      <p className="text-sm font-semibold">Actions</p>
      <div className="flex md:flex-col gap-2">
        <Button size="sm" variant="outline" className="w-full">
          <Copy className="w-4 h-4 mr-2 text-slate-500" />
          Copy
        </Button>
        <Button size="sm" variant="outline" className="w-full">
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
