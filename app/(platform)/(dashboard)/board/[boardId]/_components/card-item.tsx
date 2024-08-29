"use client";

import { Card } from "@prisma/client";

interface CardItemProps {
  data: Card;
  index: number;
}
function CardItem({ data, index }: CardItemProps) {
  return (
    <li key={data.id} className="w-full">
      <div className="truncate border-2 border-transparent hover:border-slate-800 py-2 cursor-pointer px-3 text-sm bg-white rounded-md shadow-sm transition">
        <p>{data.title}</p>
      </div>
    </li>
  );
}

export default CardItem;
