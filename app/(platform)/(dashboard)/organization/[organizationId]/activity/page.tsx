import { Separator } from "@/components/ui";
import Info from "../_components/info";
import { Suspense } from "react";
import ActivityList from "./_components/activity-list";

function ActivityPage() {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-4" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
}

export default ActivityPage;
