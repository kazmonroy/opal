import Navbar from './_components/Navbar';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full'>
      <Navbar />
      {children}
    </div>
  );
}

export default DashboardLayout;
