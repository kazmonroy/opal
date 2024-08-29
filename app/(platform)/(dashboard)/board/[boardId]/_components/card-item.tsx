"use client";

import { Card } from "@prisma/client";
import { Draggable, Droppable } from "@hello-pangea/dnd";
interface CardItemProps {
  data: Card;
  index: number;
}
function CardItem({ data, index }: CardItemProps) {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          key={data.id}
          className="w-full"
          role="button"
        >
          <div className="truncate border-2 border-transparent hover:border-slate-800 py-2 px-3 text-sm bg-white rounded-md shadow-sm transition">
            <p>{data.title}</p>
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default CardItem;
