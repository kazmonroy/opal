'use client';

import { Board } from '@prisma/client';
import { Button } from '@/components/ui';

interface BoardTitleFormProps {
  data: Board;
}
function BoardTitleForm({ data: { title } }: BoardTitleFormProps) {
  return (
    <Button
      variant='transparent'
      className='font-bold text-lg h-auto w-auto p-1 px-2'
    >
      {title}
    </Button>
  );
}

export default BoardTitleForm;
