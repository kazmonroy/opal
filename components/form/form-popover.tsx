'use client';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
} from '@/components/ui';
import { useAction } from '@/hooks/use-action';
import { createBoard } from '@/actions';
import { FormInput } from './form-input';
import FormSubmit from './form-submit';
import { X } from 'lucide-react';

interface FormPopoverProps {
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideoffset?: number;
}
function FormPopover({ children, side, align, sideoffset }: FormPopoverProps) {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    execute({ title });
  };
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className='w-80 pt-3'
        side={side}
        sideOffset={sideoffset}
      >
        <div className='text-sm font-medium text-center to-slate-600 pb-4'>
          Create board
        </div>
        <PopoverClose asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-slate-600'
            variant='ghost'
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <form className='space-y-4' action={onSubmit}>
          <div className='space-y-4'>
            <FormInput id='title' label='Board title' type='text' />
          </div>
          <FormSubmit className='w-full'>Creat</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default FormPopover;
