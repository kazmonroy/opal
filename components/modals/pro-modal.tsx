"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "@/components/ui";
import Image from "next/image";

function ProModal() {
  const isOpen = useProModal((state) => state.isOpen);
  const onClose = useProModal((state) => state.onClose);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image
            src="/pro-modal.svg"
            alt="Team work"
            className="object-cover"
            fill
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ProModal;
