'use client';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Skeleton,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { Activity, CreditCard, Layout, Settings } from 'lucide-react';

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
  const pathname = usePathname();
  const router = useRouter();
  const routes = [
    {
      label: 'Boards',
      icon: <Layout className='h-4 w-4 mr-2' />,
      href: `/organization/${organization.id}`,
    },
    {
      label: 'Activity',
      icon: <Activity className='h-4 w-4 mr-2' />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: 'Settings',
      icon: <Settings className='h-4 w-4 mr-2' />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: 'Billing',
      icon: <CreditCard className='h-4 w-4 mr-2' />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const handleClick = (href: string) => {
    router.push(href);
  };

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
      <AccordionContent className='pt-1 text-slate-700'>
        {routes.map((route) => (
          <Button
            key={route.href}
            size='sm'
            variant='ghost'
            onClick={() => handleClick(route.href)}
            className={cn(
              'w-full font-normal justify-start pl-10 mb-1',
              pathname === route.href &&
                'bg-slate-300/20 text-slate-800 font-semibold'
            )}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className='flex items-center gap-x-2'>
      <div className='h-8 w-8 relative shrink-0'>
        <Skeleton className='h-full w-full absolute' />
      </div>
      <Skeleton className='h-8 w-full' />
    </div>
  );
};

export default NavItem;
