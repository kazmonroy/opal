"use client";

import { ListWithCards } from "@/types";
import ListHeader from "./list-header";
import { ElementRef, useRef, useState } from "react";
import CardForm from "./card-form";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}
function ListItem({ data, index }: ListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };
  return (
    <li className="shrink-0 h-full w-[17rem] select-none">
      <div className="w-full rounded-md bg-slate-50 shadow-md pb-2">
        <ListHeader onAddCard={enableEditing} data={data} />
        <CardForm
          listId={data.id}
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
}

export default ListItem;
