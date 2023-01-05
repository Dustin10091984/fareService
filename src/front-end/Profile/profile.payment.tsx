import * as React from "react";

export interface IProfilePaymentMethodsProps {}

export default function ProfilePaymentMethods(
  props: IProfilePaymentMethodsProps
) {
  const methods = [
    "cash",
    "zelle",
    "stripe",
    "gpay",
    "apple-pay",
    "cash-app",
    "venmo",
    "paypal",
    "visa",
  ];
  return (
    <div className="fare-card">
      <h2>Payment Methods</h2>
      <div className="grid grid-cols-3 gap-8 py-4">
        {methods.map((method) => (
          <div
            key={method}
            className="rounded-xl shadow-[0_1px_8px_2px_#14141414] flex items-center justify-center h-[5.6rem] px-3"
          >
            <img src={`/assets/img/payment-${method}.png`} />
          </div>
        ))}
      </div>
      <button className="fare-btn fare-btn-default fare-btn-sm">
        View all
      </button>
    </div>
  );
}
