import * as React from "react";

export interface IBookQuotationSucceedProps {
  title?: string;
  subTitle?: string;
  onDone?: () => void;
}

export default function BookQuotationSucceed(
  props: IBookQuotationSucceedProps
) {
  const { title = "", subTitle = "", onDone } = props;
  return (
    <div className="d-flex flex-column items-center gap-8 py-20">
      <img src="/assets/img/quotation-succeed.svg" />
      <span className="font-medium text-3xl">{title}</span>
      <span className="text-gray-500 text-sm">{subTitle}</span>
      <button
        className="fare-btn fare-btn-primary fare-btn-lg"
        onClick={onDone}
      >
        Done
      </button>
    </div>
  );
}
