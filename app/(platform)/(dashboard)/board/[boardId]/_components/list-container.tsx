'use client';

import { ListWithCards } from '@/types';
import ListForm from './list-form';

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

export default function ListContainer({ boardId, data }: ListContainerProps) {
  return (
    <ol className='w-full h-full'>
      <ListForm />
      <div className='flex-shrink-0 w-1' />
    </ol>
  );
}
