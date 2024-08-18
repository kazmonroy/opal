'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { Button, Separator, Accordion, Skeleton } from '@/components/ui';
import NavItem, { Organization } from './nav-item';

interface SidebarProps {
  storagekey?: string;
}

function Sidebar({ storagekey = 'sidebar-state' }: SidebarProps) {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storagekey,
    {}
  );
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  //   Iterate over the expanded id and return an array of active accordions ids
  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded.id,
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <Skeleton />
      </>
    );
  }
  return (
    <aside>
      <div className='font-medium text-xs flex items-center mb-1'>
        <span className='pl-4'>Workspaces</span>
        <Button
          asChild
          type='button'
          variant='ghost'
          className='ml-auto'
          size='sm'
        >
          <Link href='/select-org'>
            <Plus className='h-4 w-4' />
          </Link>
        </Button>
      </div>
      <Accordion
        type='multiple'
        defaultValue={defaultAccordionValue}
        className='space-y-2'
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </aside>
  );
}

export default Sidebar;
