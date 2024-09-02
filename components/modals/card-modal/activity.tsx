"use client";

import { Skeleton } from "@/components/ui";

function Activity() {
  return <div>Activity</div>;
}

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="bg-slate-200 h-6 w-6" />

      <div className="w-full">
        <Skeleton className="bg-slate-200 w-24 h-6 mb-2" />
        <Skeleton className="bg-slate-200 w-full h-10" />
      </div>
    </div>
  );
};
export default Activity;
