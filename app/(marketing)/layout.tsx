import Logo from '@/components/logo';
import Navbar from './_components/navbar';
import Footer from './_components/footer';

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full bg-slate-50'>
      <Navbar />
      <main className='pt-40 pb-20 bg-slate-50'>{children}</main>
      <Footer />
    </div>
  );
}

export default MarketingLayout;
