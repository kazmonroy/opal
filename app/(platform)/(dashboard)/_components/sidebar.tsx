'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { Button, Separator, Accordion } from '@/components/ui';

interface SidebarProps {
  storagekey?: string;
}

function Sidebar({ storagekey }: SidebarProps) {
  return <aside>Sidebar!</aside>;
}

export default Sidebar;
