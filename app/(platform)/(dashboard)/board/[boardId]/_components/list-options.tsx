'use client';

import { toast } from 'sonner';
import { List } from '@prisma/client';
import { MoreHorizontal, X } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
  Separator,
} from '@/components/ui';
import FormSubmit from '@/components/form/form-submit';
import { useAction } from '@/hooks/use-action';
import { deleteList } from '@/actions';

interface ListOptionsProps {
  onAddCard: () => void;
  data: List;
}

function ListOptions({ onAddCard, data }: ListOptionsProps) {
  const { execute } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} deleted!`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleDeleteList = (formData: FormData) => {
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;
    execute({ id, boardId });
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className='h-auto w-auto p-2' variant='ghost'>
            <MoreHorizontal className='w-4 h-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='px-0 py-2' side='bottom' align='start'>
          <Button
            onClick={onAddCard}
            variant='ghost'
            className='rounded-none w-full h-auto p-2 px-5 text-sm text-left font-light justify-start'
          >
            Add card
          </Button>

          <form action=''>
            <input hidden name='id' id='id' defaultValue={data.id} />
            <input
              hidden
              name='boardId'
              id='boardId'
              defaultValue={data.boardId}
            />
            <FormSubmit
              variant='ghost'
              className='rounded-none w-full h-auto p-2 px-5 text-sm text-left font-light justify-start'
            >
              Copy
            </FormSubmit>
          </form>

          <Separator className='my-1' />

          <form action={handleDeleteList}>
            <input hidden name='id' id='id' defaultValue={data.id} />
            <input
              hidden
              name='boardId'
              id='boardId'
              defaultValue={data.boardId}
            />
            <FormSubmit
              variant='ghost'
              className='rounded-none w-full h-auto p-2 px-5 text-sm text-left font-light justify-start'
            >
              Delete
            </FormSubmit>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ListOptions;
