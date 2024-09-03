'use client';

import { Skeleton } from '@/components/ui';
import { useOrganization } from '@clerk/nextjs';
import { CreditCard } from 'lucide-react';
import Image from 'next/image';

interface InfoProps {
  isPro: boolean;
}
function Info({ isPro }: InfoProps) {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return <Info.Skeleton />;
  }
  return (
    <div className='flex items-center gap-x-4'>
      <div className='w-[60px] h-[60px] relative'>
        <Image
          fill
          sizes='100%'
          src={organization?.imageUrl!}
          alt='Organization'
          className='rounded-md object-cover'
        />
      </div>
      <div className='space-y-1'>
        <p className='font-semibold text-xl'>{organization?.name}</p>
        <div className='flex items-center text-xs text-muted-foreground'>
          {isPro ? (
            <span className='flex items-center py-1 px-1.5 bg-slate-100 text-slate-600 rounded-sm'>
              <CreditCard className='h-3 w-3 mr-1' />
              Pro
            </span>
          ) : (
            <span className='flex items-center py-1 '>
              <CreditCard className='h-3 w-3 mr-1' />
              Free
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className='flex items-center gap-x-4'>
      <div className='w-[60px] h-[60px] relative'>
        <Skeleton className='h-full w-full absolute' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-10 w-[200px]' />
        <div className='flex items-center'>
          <Skeleton className='h-4 w-4 mr-2' />
          <Skeleton className='h-4 w-[100px]' />
        </div>
      </div>
    </div>
  );
};
export default Info;
