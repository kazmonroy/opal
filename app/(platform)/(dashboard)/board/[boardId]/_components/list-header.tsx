'use client';

import { useEventListener } from 'usehooks-ts';
import { ElementRef, useRef, useState } from 'react';
import { List } from '@prisma/client';
import { FormInput } from '@/components/form/form-input';

interface ListHeaderProps {
  data: List;
}

function ListHeader({ data }: ListHeaderProps) {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      formRef.current?.requestSubmit();
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);

  return (
    <div className='pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2 '>
      {isEditing ? (
        <form action='' className='flex-1 rounded-sm text-sm h-7 font-medium  '>
          <input type='text' hidden id='id' name='id' value={data.id} />
          <input
            type='text'
            hidden
            id='boardId'
            name='boardId'
            value={data.boardId}
          />
          <FormInput
            ref={inputRef}
            id='title'
            placeholder='Enter list title'
            onBlur={disableEditing}
            defaultValue={title}
            className='font-medium border-transparent hover:border-input focus:border-input bg-transparent focus:bg-slate-50  transition truncate'
          />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className='w-full text-sm px-2.5 py-1 h-7 font-medium cursor-pointer'
        >
          {title}
        </div>
      )}
    </div>
  );
}

export default ListHeader;
