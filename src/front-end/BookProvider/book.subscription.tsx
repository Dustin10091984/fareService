import * as React from "react";
import RadioBoxButton from "../../components/button.radio";
import { useState } from "react";

export interface IBookCheckoutPlanProps extends IBookSliderProps {}

export default function BookCheckoutPlan(props: IBookCheckoutPlanProps) {
  const { onPrev, onNext } = props;
  const [checkoutPlan, setCheckoutPlan] = useState<boolean>(null);
  return (
    <div className="d-flex flex-col items-center gap-8 max-w-[60rem]">
      <span className="font-medium text-3xl">Payment</span>
      <span className="text-sm text-gray-400 text-center">
        Do you want to check out with Package Subscription Plan to automatically
        renew every 30 days?
      </span>
      <RadioBoxButton
        className="w-100"
        checked={checkoutPlan == true}
        text="Yes ( Package Subscription)"
        onChange={() => {
          setCheckoutPlan(true);
        }}
      />
      <RadioBoxButton
        className="w-100"
        checked={checkoutPlan == false}
        text="No ( One-Off)"
        onChange={() => {
          setCheckoutPlan(false);
        }}
      />
      <div className="gap-8 d-flex">
        {onPrev && (
          <button
            className="fare-btn fare-btn-default fare-btn-lg"
            onClick={onPrev}
          >
            Previous
          </button>
        )}
        <button
          className="fare-btn fare-btn-primary fare-btn-lg"
          onClick={() => {
            onNext({ checkoutPlan });
          }}
          disabled={checkoutPlan == null}
        >
          Next
        </button>
      </div>
    </div>
  );
}
