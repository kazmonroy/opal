'use client';

import { List } from '@prisma/client';

interface ListItemProps {
  data: List;
  index: number;
}
function ListItem({ data, index }: ListItemProps) {
  return <div>{data.title}</div>;
}

export default ListItem;
