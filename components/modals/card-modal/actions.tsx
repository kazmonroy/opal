"use client";

import { Button, Skeleton } from "@/components/ui";

function Actions() {
  return (
    <div>
      Actions
      <div className="flex items-center gap-x-2">
        <Button size="sm">Copy</Button>
        <Button size="sm" variant="destructive">
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
