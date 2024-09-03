import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import FormPopover from "@/components/form/form-popover";
import Hint from "@/components/hint";
import { Skeleton } from "@/components/ui";
import { db } from "@/db";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { getAvailableCount } from "@/lib/org-limit";

async function BoardList() {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("select-org");
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const availableCount = await getAvailableCount();

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold font-lg text-slate-700">
        <User2 className="h-6 w-6 mr-2" />
        <p>Your boards!</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {/* Serves as the trigger for the popover */}
        <FormPopover sideoffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center p-4 hover:opacity-75 transition"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-sm">
              {MAX_FREE_BOARDS - availableCount} remaining
            </span>
            <Hint
              sideOffset={40}
              description={`Free Workspaces can have up to 5 open boards. For unlimited boards upgrade to Pro`}
            >
              <HelpCircle className="bottom-2 right-2 h-[14px] w-[14px] absolute" />
            </Hint>
          </div>
        </FormPopover>

        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            style={{
              backgroundImage: `url(${board.imageThumbUrl})`,
            }}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover rounded-sm bg-slate-500 h-full w-full p-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative  text-slate-50 ">{board.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video p-2 h-full w-full" />
      <Skeleton className="aspect-video p-2 h-full w-full" />
      <Skeleton className="aspect-video p-2 h-full w-full" />
      <Skeleton className="aspect-video p-2 h-full w-full" />
      <Skeleton className="aspect-video p-2 h-full w-full" />
      <Skeleton className="aspect-video p-2 h-full w-full" />
      <Skeleton className="aspect-video p-2 h-full w-full" />
      <Skeleton className="aspect-video p-2 h-full w-full" />
    </div>
  );
};

export default BoardList;
