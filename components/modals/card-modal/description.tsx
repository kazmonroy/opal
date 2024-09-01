"use client";

import { CardWithList } from "@/types";

interface DescriptionProps {
  data: CardWithList;
}
function Description({ data }: DescriptionProps) {
  return <div>{data.description}</div>;
}

export default Description;
