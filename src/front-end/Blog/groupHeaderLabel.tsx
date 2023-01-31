import * as React from "react";

export interface IBlogLabelProps {
  name: string;
}

export default function BlogGroupHeaderLabel(props: IBlogLabelProps) {
  const { name } = props;
  return (
    <div className="flex gap-4 items-center">
      <span className="font-bold text-base">{name}</span>
      <hr className="grow border-t-4 border-gray-200" />
    </div>
  );
}
