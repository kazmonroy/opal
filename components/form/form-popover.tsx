'use client';

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui';
import { useAction } from '@/hooks/use-action';
import { createBoard } from '@/actions';
import { FormInput } from './form-input';
import FormSubmit from './form-submit';

interface FormPopoverProps {
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideoffset?: number;
}
function FormPopover({ children, side, align, sideoffset }: FormPopoverProps) {
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
      </PopoverContent>
    </Popover>
  );
}

export default FormPopover;
