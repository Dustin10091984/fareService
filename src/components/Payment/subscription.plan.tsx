import * as React from "react";
import { clsx } from "clsx";

export interface ISubscriptionPlanProps {
  active?: boolean;
  onSelect?: () => void;
  onNext?: () => void;
  plan: IProviderPlan;
}

export default function SubscriptionPlan(props: ISubscriptionPlanProps) {
  const { active, onSelect, onNext, plan } = props;
  const fields: (keyof IProviderPlan)[] = ["type", "duration"];
  const fieldsDisplay = ["Type", "Duration"];
  return (
    <div
      onClick={() => {
        onSelect?.call(null);
      }}
      className={clsx([
        "rounded-[2.4rem] p-10 relative overflow-auto w-100",
        active
          ? "shadow-[0_1px_24px_8px_#14141414] border-primary-main border-[2px]"
          : "shadow-[0_1px_8px_1px_#14141414]",
      ])}
    >
      {active && (
        <span className="absolute top-0 right-0 bg-[#0068E131] rounded-bl-3xl">
          <i className="la la-check-square text-primary-main text-sm m-[.75rem]"></i>
        </span>
      )}
      <div className="flex flex-col gap-6 text-xs text-gray-700  h-[32rem] ">
        <div className="flex gap-4 items-center">
          <img
            alt="Package"
            src="/assets/img/package.svg"
            className="w-[4.8rem] h-[4.8rem] p-3 rounded-xl shadow-[0_0_8px_0_#14141414]"
          />
          <div>
            <p className="text-base font-medium">{plan.title}</p>
            <p className="text-sm font-medium">
              <span className={plan.off > 0 && "line-through mr-2"}>
                ${plan.price}
              </span>
              {plan.off > 0 &&
                `$${(((100 - plan.off) / 100) * Number(plan.price)).toFixed(
                  2
                )}`}
              <small className="text-gray-300">/hour</small>
            </p>
          </div>
        </div>
        <p className="text-gray-400">{plan.description}</p>
        <div className="overflow-auto flex-grow">
          {fields.map((field, i) => {
            return (
              <div key={i}>
                <i className="la la-check text-green-400 mr-3"></i>
                <span>
                  {fieldsDisplay[i]}:&ensp;{plan[field]}
                </span>
              </div>
            );
          })}
        </div>
        <button
          className="fare-btn fare-btn-primary"
          disabled={!active}
          onClick={() => {
            onNext();
          }}
        >
          Get started
        </button>
      </div>
    </div>
  );
}
