'use client';

import { MoreHorizontal, X } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
} from '@/components/ui';

interface BoardOptionsProps {
  id: string;
}
function BoardOptions({ id }: BoardOptionsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2' variant='transparent'>
          <MoreHorizontal className='w-4 h-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
        <div className='text-sm font-medium text-center  text-slate-600 pb-4'>
          Board actions
          <PopoverClose asChild>
            <Button
              variant='ghost'
              className='absolute w-auto h-auto top-2 right-2'
            >
              <X className='w-4 h-4' />
            </Button>
          </PopoverClose>
        </div>

        <Button
          variant='ghost'
          onClick={() => console.log('delete')}
          className='rounded-none w-full h-auto p-2 px-5 text-sm text-left font-normal justify-start'
        >
          Delete board
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default BoardOptions;
