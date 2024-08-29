"use client";

import { Card } from "@prisma/client";

interface CardItemProps {
  data: Card;
  index: number;
}
function CardItem({ data, index }: CardItemProps) {
  return (
    <li key={data.id} className="w-full">
      <div className="w-full bg-white rounded-md shadow-md p-2 mb-2">
        <p>{data.title}</p>
      </div>
    </li>
  );
}

export default CardItem;
