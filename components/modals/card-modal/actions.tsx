"use client";

import { Button } from "@/components/ui";

function Actions() {
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <Button size="sm">Copy</Button>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </div>
    </div>
  );
}

export default Actions;
