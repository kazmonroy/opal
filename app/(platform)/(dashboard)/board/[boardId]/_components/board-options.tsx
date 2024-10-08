'use client';

import { MoreHorizontal, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
} from '@/components/ui';
import { useAction } from '@/hooks/use-action';
import { deleteBoard } from '@/actions';

interface BoardOptionsProps {
  id: string;
}
function BoardOptions({ id }: BoardOptionsProps) {
  const router = useRouter();
  const { execute, isLoading } = useAction(deleteBoard, {
    onSuccess: (data) => {
      toast.success(`Board ${data.title} deleted!`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleDeleteBoard = () => {
    execute({ id });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2' variant='transparent'>
          <MoreHorizontal className='w-4 h-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 py-2' side='bottom' align='start'>
        <Button
          variant='ghost'
          disabled={isLoading}
          onClick={handleDeleteBoard}
          className='rounded-none w-full h-auto p-2 px-5 text-sm text-left font-light justify-start'
        >
          Delete board
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default BoardOptions;
