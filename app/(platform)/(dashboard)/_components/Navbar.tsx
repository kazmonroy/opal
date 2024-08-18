import Logo from '@/components/logo';
import { Button } from '@/components/ui';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { Plus } from 'lucide-react';

function Navbar() {
  return (
    <nav className='fixed px-4 z-50 top-0 w-full h-14 border-b shadow-sm bg-slate-50 flex items-center'>
      {/* TODO: Mobile Sidebar */}
      <div className='flex items-center gap-x-4'>
        <div className='hidden md:flex'>
          <Logo />
        </div>
        <Button size='sm' className=''>
          <Plus className='h-4 w-4 block md:hidden' />
          <span className='hidden md:block'>Create</span>
        </Button>
      </div>
      <div className='ml-auto flex items-center gap-x-2'>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl='/organization/:id'
          afterLeaveOrganizationUrl='/select-org'
          afterSelectOrganizationUrl='/organization/:id'
        />
        <UserButton
          afterSwitchSessionUrl='/'
          appearance={{
            elements: {
              avatarBox: {
                height: 24,
                width: 24,
              },
            },
          }}
        />
      </div>
    </nav>
  );
}

export default Navbar;
