"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";
interface CardItemProps {
  data: Card;
  index: number;
}
function CardItem({ data, index }: CardItemProps) {
  const cardModal = useCardModal();
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
          onClick={() => cardModal.onOpen(data.id)}
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
