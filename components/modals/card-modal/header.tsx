"use client";

import { CardWithList } from "@/types";

interface HeaderProps {
  data: CardWithList;
}
function Header({ data }: HeaderProps) {
  const { title, list } = data;
  return <div>{title}</div>;
}

export default Header;
