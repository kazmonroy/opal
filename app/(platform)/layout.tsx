import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/components/providers/modal-provider";

function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <Toaster />
      <ModalProvider />
      {children}
    </ClerkProvider>
  );
}

export default PlatformLayout;
