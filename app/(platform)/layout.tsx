import { ClerkProvider } from '@clerk/nextjs';
import Image from 'next/image';

function PlatformLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}

export default PlatformLayout;
