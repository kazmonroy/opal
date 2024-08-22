'use client';

import { useOrganization } from '@clerk/nextjs';
import { CreditCard } from 'lucide-react';
import Image from 'next/image';

function Info() {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  return (
    <div className='flex items-center gap-x-4'>
      <div className='w-[60px] h-[60px] relative'>
        <Image
          fill
          src={organization?.imageUrl!}
          alt='Organization'
          className='rounded-md object-cover'
        />
      </div>
      <div className='space-y-1'>
        <p className='font-semibold text-xl'>{organization?.name}</p>
        <div className='flex items-center text-xs text-muted-foreground'>
          <CreditCard className='h-3 w-3 mr-1' />
          Free
        </div>
      </div>
    </div>
  );
}

export default Info;
