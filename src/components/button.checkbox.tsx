import clsx from "clsx";
import * as React from "react";

export interface ICheckBoxButtonProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  text?: string | JSX.Element;
  className?: string;
  shadow?: boolean;
}

export default function CheckBoxButton(props: ICheckBoxButtonProps) {
  const {
    checked = false,
    onChange,
    text = "",
    className = "",
    shadow = true,
  } = props;
  return (
    <button
      className={clsx([
        { "border-primary-main text-primary-main": checked },
        { "text-gray-700": !checked },
        { "shadow-[0_8px_16px_0_#00000014]": shadow },
        "text-sm px-8 py-3 rounded-3xl flex items-center bg-primary-light hover:bg-gray-50",
        className,
      ])}
      onClick={() => onChange(!checked)}
    >
      <span className="mx-3 grow text-start">{text}</span>
      <input
        type="checkbox"
        className={clsx([
          `w-[2rem] h-[2rem] bg-transparent`,
          { active: checked },
        ])}
        checked={checked}
        onChange={() => onChange(!checked)}
      />
    </button>
  );
}
