import clsx from "clsx";
import * as React from "react";

export interface IRadioBoxButtonProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  text?: string | JSX.Element;
  className?: string;
  shadow?: boolean;
  type?: "radio" | "checkbox";
}

export default function RadioBoxButton(props: IRadioBoxButtonProps) {
  const {
    checked = false,
    onChange,
    text = "",
    className = "",
    shadow = true,
    type = "radio",
  } = props;
  return (
    <button
      className={clsx([
        { "border-primary-main text-primary-main": checked },
        { "text-gray-700": !checked },
        { "shadow-[0_8px_16px_0_#00000014]": shadow },
        type == "radio" ? "rounded-[2.4rem]" : "rounded-xl",
        "text-sm px-8 py-10 border-2 flex items-center hover:bg-gray-50",
        className,
      ])}
      onClick={() => {
        type == "radio" ? onChange(true) : onChange(!checked);
      }}
    >
      <input
        type={type}
        name="slots"
        className={clsx([`w-[2rem] h-[2rem] `, { active: checked }])}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="mx-3">{text}</span>
    </button>
  );
}
