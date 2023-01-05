import clsx from "clsx";
import React, {
  createRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import * as _ from "underscore";
export interface IOTPVerifyInputProps {
  length?: number;
  onComplete: (value: string) => void;
}

export default function OTPVerifyInput(props: IOTPVerifyInputProps) {
  const { length = 4, onComplete } = props;
  const inputRefs = useRef<MutableRefObject<HTMLInputElement>[]>([]);
  const [otpCodes, setOptCodes] = useState<string[]>(
    new Array(length).fill("")
  );

  if (inputRefs.current.length !== length) {
    inputRefs.current = Array(length)
      .fill(null)
      .map((_, i) => inputRefs[i] || createRef());
  }

  return (
    <div className="flex justify-center gap-8">
      {_.range(0, length).map((index) => {
        return (
          <div
            key={index}
            className="w-[7.5rem] h-[6.6rem] relative flex items-center justify-center"
          >
            {otpCodes[index] === "" && (
              <span className="absolute w-[1rem] h-[1rem] bg-gray-600 rounded-full"></span>
            )}
            <input
              maxLength={1}
              ref={inputRefs.current[index]}
              className={clsx([
                `w-100 h-100
                rounded-[1.6rem]
                text-center 
                font-medium
                relative
                focus:outline-0 focus:border-primary-main focus:text-primary-main focus:bg-white`,
                {
                  "bg-[#ffffff00] border-[1px] border-gray-400":
                    otpCodes[index] === "",
                  "focus:bg-primary-main focus:text-white bg-primary-main text-[#fff]":
                    otpCodes[index] !== "",
                },
              ])}
              value={otpCodes[index]}
              onChange={(e) => {
                const value = e.target.value;
                if (value == "" || !isNaN(Number(value))) {
                  otpCodes[index] = value;
                  setOptCodes([...otpCodes]);

                  if (value && index + 1 < length) {
                    setTimeout(() =>
                      inputRefs.current[index + 1].current?.focus()
                    );
                  }
                  if (index == length - 1) {
                    onComplete && onComplete(otpCodes.join(""));
                  }
                }
              }}
              onKeyDown={(e) => {
                console.log(e);
                if (
                  e.key === "Backspace" &&
                  (e.target as HTMLInputElement).value == "" &&
                  index > 0
                ) {
                  setTimeout(() =>
                    inputRefs.current[index - 1].current?.focus()
                  );
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
