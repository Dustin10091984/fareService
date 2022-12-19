import clsx from "clsx";
import * as React from "react";

export interface IRadioBoxButtonProps {
  checked?: boolean;
  onChange?: (e: any) => void;
  text?: string | JSX.Element;
  className?: string;
}

export default function RadioBoxButton(props: IRadioBoxButtonProps) {
  const { checked = false, onChange, text = "", className = "" } = props;
  return (
    <button
      className={clsx([
        { "border-primary-main text-primary-main": checked },
        { "text-gray-700": !checked },
        "text-sm shadow-[0_8px_16px_0_#00000014] px-8 py-10 border-2 rounded-[24px] flex items-center hover:bg-gray-50",
        className,
      ])}
      onClick={onChange}
    >
      <input
        type="radio"
        name="slots"
        className={clsx([`w-[2rem] h-[2rem] `, { active: checked }])}
        checked={checked}
        onChange={onChange}
      />
      <span className="mx-3">{text}</span>
    </button>
  );
}
