"use client";

import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";
import { Skeleton } from "@/components/ui";
import ActivityItem from "@/components/activity-item";

interface ActivityProps {
  data: AuditLog[];
}

function Activity({ data }: ActivityProps) {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="w-5 h-5 mt-0.5 text-slate-700" />
      <div className="w-full">
        <p className="font-semibold text-slate-700 mb-2">Activity</p>

        <ol className="mt-2 space-y-4">
          {data.map((log) => (
            <ActivityItem key={log.entityId} data={log} />
          ))}
        </ol>
      </div>
    </div>
  );
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
