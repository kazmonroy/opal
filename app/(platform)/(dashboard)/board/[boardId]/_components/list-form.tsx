'use client';

import { ElementRef, useRef, useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui';
import ListWrapper from './list-wrapper';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

function ListForm() {
  const formrRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formrRef, disableEditing);

  return (
    <ListWrapper>
      <Button variant='outline' className='w-full'>
        <Plus className='w-4 h-4 mr-2' />
        Create List
      </Button>
    </ListWrapper>
  );
}

export default ListForm;
