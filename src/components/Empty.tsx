import * as React from "react";

export interface IEmptyProps {
  className?: string;
  text?: string;
  icon?: string;
}

export default function Empty(props: IEmptyProps) {
  const { className = "", text = "No Data", icon = "list" } = props;
  return (
    <div className={`${className} flex items-center gap-6`}>
      <i className={`la la-${icon}`}></i>
      <div className="text-lg font-medium">{text}</div>
    </div>
  );
}
