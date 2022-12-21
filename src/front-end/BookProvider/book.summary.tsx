import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getQuestionAnswers } from "../../store/Slices/services/QuestionAnswersSlice";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ServiceState } from "../../store/Slices/services/ServiceSclice";
export interface IBookSummaryProps
  extends IBookSliderProps<Partial<IServiceRequestHourly>>,
    IServiceRequestHourly {
  provider: IProvider;
}

export default function BookSummary(props: IBookSummaryProps) {
  const {
    onPrev,
    onNext,
    prevLabel = "Previous",
    nextLabel = "Next",
    hours,
    address,
    provider,
    payMethod,
  } = props;

  const service = useSelector<RootState, ServiceState>(
    (state) => state.service
  );
  const questions = useSelector<RootState, IServiceQuestion[]>(
    (state) => state.service.data.questions
  );
  const questionAnswers = useSelector<RootState>((state) =>
    getQuestionAnswers(state.questionAnswers)
  );
  const amount = Number(provider.provider_profile?.hourly_rate) * hours;
  return (
    <div className="d-flex flex-column items-center gap-8 order-summary">
      <span className="font-medium text-3xl">Order Summary</span>
      <ul className="list-group w-[72rem] rounded-[1.2rem]">
        <li className="list-group-item d-flex justify-between">
          Service:<span className="font-bold">{service.data?.name}</span>
        </li>
        <li className="list-group-item d-flex justify-between">
          Provider:
          <span className="font-bold">
            {provider?.first_name}&ensp;{provider?.last_name}
          </span>
        </li>
        {questions?.map((q) => (
          <li className="list-group-item d-flex justify-between" key={q.id}>
            {q.question}:
            <span className="font-bold">
              {q.options.find(
                (op) => op.id === questionAnswers[`question_${q.id}`]
              )?.option || ""}
            </span>
          </li>
        ))}
        <li className="list-group-item d-flex justify-between">
          Work Hours:<span className="font-bold">{hours}</span>
        </li>
        <li className="list-group-item d-flex justify-between">
          Address:
          <span className="font-bold">{address}</span>
        </li>
        <li className="list-group-item d-flex justify-between bg-primary-dark text-white">
          Total (USD)
          <span className="font-bold">
            ${Number(provider.provider_profile?.hourly_rate) * hours}
          </span>
        </li>
      </ul>
      <div className="gap-8 d-flex">
        {onPrev && (
          <button
            className="fare-btn fare-btn-default fare-btn-lg"
            onClick={onPrev}
          >
            {prevLabel}
          </button>
        )}

        {payMethod == "Paypal" && (
          <PayPalButtons
            fundingSource="paypal"
            className="flex items-center w-[30rem]"
            style={{
              color: "blue",
              label: "pay",
              height: 50,
            }}
            createOrder={async (data, actions) => {
              return await actions.order.create({
                purchase_units: [
                  {
                    amount: { value: `${amount}` },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const order = await actions.order.capture();
              onNext && onNext({ order_paypal: order });
              console.log("Order", order);
            }}
          />
        )}
        {payMethod == "Card" && (
          <button
            className="fare-btn fare-btn-primary fare-btn-lg"
            onClick={() => {
              onNext && onNext();
            }}
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
}
