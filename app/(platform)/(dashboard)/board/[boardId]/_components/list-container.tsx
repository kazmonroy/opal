"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ListWithCards } from "@/types";
import ListForm from "./list-form";
import ListItem from "./list-item";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

export default function ListContainer({ boardId, data }: ListContainerProps) {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);
  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="lists" type="lists" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}
