'use client';

import { ElementRef, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { Button } from '@/components/ui';
import ListWrapper from './list-wrapper';
import { FormInput } from '@/components/form/form-input';

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

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action=''
          ref={formrRef}
          className='w-full p-3 rounded-md bg-slate-50 space-y-4 shadow-md'
        >
          <FormInput
            ref={inputRef}
            id='title'
            defaultValue=''
            placeholder='Enter list title'
            className='text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition'
          />
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <Button onClick={enableEditing} variant='outline' className='w-full'>
        Create List
        <Plus className='w-4 h-4 ml-2' />
      </Button>
    </ListWrapper>
  );
}

export default ListForm;
