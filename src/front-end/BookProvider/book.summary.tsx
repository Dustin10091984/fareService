import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getQuestionAnswers } from "../../store/Slices/services/QuestionAnswersSlice";

export interface IBookSummaryProps
  extends IBookSliderProps,
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
  } = props;

  const questions = useSelector<RootState, IServiceQuestion[]>(
    (state) => state.service.data.questions
  );
  const questionAnswers = useSelector<RootState>((state) =>
    getQuestionAnswers(state.questionAnswers)
  );

  return (
    <div className="d-flex flex-column items-center gap-8 order-summary">
      <span className="font-medium text-3xl">Order Summary</span>
      <ul className="list-group w-[72rem] rounded-[1.2rem]">
        <li className="list-group-item d-flex justify-between">
          Service:<span className="font-bold">Commercial Cleaning Service</span>
        </li>
        <li className="list-group-item d-flex justify-between">
          Provider:
          <span className="font-bold">
            {provider?.first_name}&ensp;{provider?.last_name}
          </span>
        </li>
        {questions?.map((q) => (
          <li className="list-group-item d-flex justify-between">
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
        <button
          className="fare-btn fare-btn-primary fare-btn-lg"
          onClick={() => {
            onNext && onNext();
          }}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
