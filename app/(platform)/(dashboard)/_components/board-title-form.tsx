'use client';

import { ElementRef, useRef, useState } from 'react';
import { Board } from '@prisma/client';
import { Button } from '@/components/ui';
import { FormInput } from '@/components/form/form-input';

interface BoardTitleFormProps {
  data: Board;
}
function BoardTitleForm({ data: { title } }: BoardTitleFormProps) {
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const [isEditing, setIsEditing] = useState(false);
  const enableEditing = () => {
    // TODO: Add validation
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    console.log(title);
    // setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={onSubmit}
        className='flex items-center gap-x-2'
      >
        <FormInput
          ref={inputRef}
          id='title'
          defaultValue={title}
          onBlur={() => {}}
          className='font-bold text-lg px-1 py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none'
        />
      </form>
    );
  }

  return (
    <Button
      variant='transparent'
      className='font-bold text-lg h-auto w-auto p-1 px-2'
      onClick={enableEditing}
    >
      {title}
    </Button>
  );
}

export default BoardTitleForm;
