import * as React from "react";
import { useHistory } from "react-router-dom";

export interface ISubHeaderProps {
  title: string;
}

export default function SubHeader(
  props: React.PropsWithChildren<ISubHeaderProps>
) {
  const { children, title } = props;
  const history = useHistory();

  return (
    <div className="bg-white p-6 shadow-[0_4px_8px_0_#0000000A] border-top border-gray-100 sticky z-10 top-0">
      <div className="container d-flex gap-12 items-center">
        <button
          className="fare-btn fare-btn-default fare-btn-sm"
          onClick={() => {
            history.goBack();
          }}
        >
          <i className="la la-arrow-left"></i>&ensp;Back
        </button>
        <h1 className="text-3xl flex-grow font-medium">{title}</h1>
        {children}
      </div>
    </div>
  );
}
