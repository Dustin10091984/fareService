import clsx from "clsx";
import * as React from "react";

export interface ICommonInputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  error?: string;
}
const CommonInput = React.forwardRef<HTMLInputElement, ICommonInputProps>(
  (props: ICommonInputProps, ref) => {
    const { type, label, error } = props;
    const [pwdVisible, setPwdVisible] = React.useState(false);
    const togglePasswordVisibility = () => {
      setPwdVisible((pwdVisible) => !pwdVisible);
    };
    return (
      <div className="common-input mb-5">
        <label>{label}</label>
        <input {...props} ref={ref} type={pwdVisible ? "text" : type} />
        {type == "password" && (
          <i
            onClick={togglePasswordVisibility}
            className={clsx([
              "la float-right pr-3 eye-icon text-xl text-gray-600",
              !pwdVisible ? "la-eye-slash " : "la-eye",
            ])}
          ></i>
        )}
        <p className="text-danger">{error}</p>
      </div>
    );
  }
);

export default CommonInput;
