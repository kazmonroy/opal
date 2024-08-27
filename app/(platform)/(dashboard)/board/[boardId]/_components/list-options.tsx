'use client';

import { List } from '@prisma/client';

interface ListOptionsProps {
  onAddCard: () => void;
  data: List;
}

function ListOptions({ onAddCard, data }: ListOptionsProps) {
  return <div>list options</div>;
}

export default ListOptions;
