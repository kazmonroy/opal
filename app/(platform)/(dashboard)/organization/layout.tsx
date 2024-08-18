import Sidebar from '../_components/sidebar';

function OrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='pt-20 md:pt-24 px-2 grid md:grid-cols-[16rem_1fr] grid-cols-1  gap-4'>
      <div className='w-64 shrink-0 hidden md:block'>
        <Sidebar />
      </div>

      <main className='w-full '>
        <div className='max-w-4xl mx-auto'>{children}</div>
      </main>
    </div>
  );
}

export default OrganizationLayout;
