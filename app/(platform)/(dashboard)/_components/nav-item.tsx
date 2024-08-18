'use client';

import { Accordion, AccordionItem } from '@/components/ui';
import { cn } from '@/lib/utils';
import { AccordionTrigger } from '@radix-ui/react-accordion';
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
          'flex items-center gap-x-2 p-1.5 text-slate-700 rounded-md hover:bg-slate-500/10 hover:no-underline transition text-start no-underline',
          isActive && !isExpanded && 'bg-orange-500/10 text-slate-700'
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
        </div>
      </AccordionTrigger>
    </AccordionItem>
  );
}

export default NavItem;
