import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <Link href={'/'} className=''>
      <div className='hover:opacity-75 transition items-center gap-x-2 hidden md:flex'>
        <Image src='/logo.svg' alt='Opal logo' height={24} width={24} />
        <p className='font-epilogue text-lg text-slate-800'>Opal</p>
      </div>
    </Link>
  );
}

export default Logo;
