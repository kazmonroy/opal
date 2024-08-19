import { ClerkProvider } from '@clerk/nextjs';

function PlatformLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider afterSignOutUrl='/'>{children}</ClerkProvider>;
}

export default PlatformLayout;
