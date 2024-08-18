import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Navbar() {
  return (
    <header className='py-10'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <nav className='relative z-50 flex justify-between'>
          <Logo />
          <div className='flex items-center gap-x-5 md:gap-x-6'>
            <Button variant='ghost' asChild>
              <Link href='/sign-in'>Sign in</Link>
            </Button>
            <Button asChild>
              <Link href='/sign-up'>Get started today</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
