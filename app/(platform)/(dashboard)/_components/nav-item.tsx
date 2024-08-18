'use client';

import { Accordion, AccordionItem, AccordionTrigger } from '@/components/ui';
import { cn } from '@/lib/utils';

import Image from 'next/image';

export interface Organization {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
}

interface NavItemProps {
  isActive: boolean;
  isExpanded: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

function NavItem({
  isActive,
  isExpanded,
  organization,
  onExpand,
}: NavItemProps) {
  return (
    <AccordionItem value={organization.id} className='border-none'>
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          'flex items-center gap-x-2 p-1.5 text-sm font-normal text-slate-800 rounded-md hover:bg-slate-300/20  hover:no-underline transition text-start no-underline',
          isActive &&
            !isExpanded &&
            'bg-slate-300/20 text-slate-800 font-semibold'
        )}
      >
        <div className='flex items-center gap-x-2'>
          <div className='w-7 h-7 relative'>
            <Image
              src={organization.imageUrl}
              alt={organization.name}
              fill
              className='rounded-sm object-cover'
            />
          </div>
          {organization.name}
        </div>
      </AccordionTrigger>
    </AccordionItem>
  );
}

export default NavItem;
