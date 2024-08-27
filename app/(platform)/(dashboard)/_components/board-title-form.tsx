'use client';

import { ElementRef, useRef, useState } from 'react';
import { Board } from '@prisma/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui';
import { FormInput } from '@/components/form/form-input';
import { useAction } from '@/hooks/use-action';
import { updateBoard } from '@/actions';

interface BoardTitleFormProps {
  data: Board;
}
function BoardTitleForm({ data }: BoardTitleFormProps) {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const { execute, fieldErrors } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board ${data.title} updated!`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const onSubmit = (formData: FormData) => {
    const updatedTitle = formData.get('title') as string;

    if (updatedTitle !== data.title) {
      execute({ id: data.id, title: updatedTitle });
    } else {
      disableEditing();
      return;
    }
  };

  const onBlur = (title: string) => {
    if (title !== data.title) {
      formRef.current?.requestSubmit();
    } else {
      disableEditing();
      return;
    }
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
          onBlur={() => onBlur(title)}
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
