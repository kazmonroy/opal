import { AuditLog } from "@prisma/client";

interface ActivityItemProps {
  data: AuditLog;
}
function ActivityItem({ data }: ActivityItemProps) {
  return <div></div>;
}

export default ActivityItem;
