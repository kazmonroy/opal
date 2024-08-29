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

function reOrder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function ListContainer({ boardId, data }: ListContainerProps) {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const handleOnDragEnd = (result: any) => {
    const { source, destination, type } = result;
    if (!destination) return;

    // if dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // User moves a list
    if (type === "list") {
      const items = reOrder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      // OPTIMISTIC UPDATE
      setOrderedData(items);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
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
