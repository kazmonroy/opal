'use client';

import { ElementRef, useRef } from 'react';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
import FormPicker from './form-picker';

interface FormPopoverProps {
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideoffset?: number;
}
function FormPopover({ children, side, align, sideoffset }: FormPopoverProps) {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const router = useRouter();
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success('Board created');
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const image = formData.get('image') as string;
    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className='w-80 pt-3'
        side={side}
        sideOffset={sideoffset}
      >
        <div className='text-sm font-medium text-center to-slate-600 pb-4'>
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-slate-600'
            variant='ghost'
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <form className='space-y-4' action={onSubmit}>
          <div className='space-y-4'>
            <FormPicker id='image' errors={fieldErrors} />
            <FormInput
              id='title'
              label='Board title'
              type='text'
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className='w-full'>Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default FormPopover;
