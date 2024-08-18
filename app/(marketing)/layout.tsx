import Logo from '@/components/logo';

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full bg-slate-50'>
      <Logo />
      <main className='pt-40 pb-20 bg-slate-50'>{children}</main>
    </div>
  );
}

export default MarketingLayout;
