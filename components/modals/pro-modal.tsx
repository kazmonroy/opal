"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Button, Dialog, DialogContent } from "@/components/ui";
import Image from "next/image";

function ProModal() {
  const isOpen = useProModal((state) => state.isOpen);
  const onClose = useProModal((state) => state.onClose);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md pt-14 pb-6 md:p-12 overflow-hidden md:flex gap-4">
        <div className="aspect-video relative m-auto flex items-center justify-center w-64 md:w-1/2">
          <Image
            src="/pro-sub.svg"
            alt="Team work"
            className="object-cover"
            fill
          />
        </div>
        <div className="text-slate-700 mx-auto py-4 space-y-4 px-6">
          <h2 className="font-semibold text-xl mb-6">
            Upgrade to Opal Pro today!
          </h2>
          <p className="text-sm font-semibold text-slate-600">
            Explore the best of Opal
          </p>

          <div className="mt-2">
            <ul className="text-sm list-disc pl-3">
              <li>Unlimited boards</li>
              <li>Advanced task management</li>
              <li>AI workflow control </li>
              <li>And more!</li>
            </ul>
          </div>

          <Button className="w-full">Upgrade</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ProModal;
