import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ActivityItem from "@/components/activity-item";
import { db } from "@/db";

async function ActivityList() {
  const { orgId } = auth();

  if (!orgId) {
    redirect("select-org");
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
  });
  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No activity found inside this organization
      </p>
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
}

export default ActivityList;
