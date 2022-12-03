import * as React from "react";
import { useDispatch } from "react-redux";
import { setQuestionAnswers } from "../../store/Slices/services/QuestionAnswersSlice";
import { clsx } from "clsx";
import Loading from "./../common/Loading";

export interface IServiceWizardProps {
  service: IService;
  loading?: boolean;
  onComplete: () => void;
  className?: string;
  config?: {
    shadow?: boolean;
    showSeq?: boolean;
    completeLabel?: string;
  };
}

export default function ServiceWizard(props: IServiceWizardProps) {
  const {
    config: {
      shadow = true,
      showSeq = false,
      completeLabel = "Get Providers",
    } = {},
    className = "",
    loading = false,
  } = props;
  const { service } = props;
  const [step, setStep] = React.useState(0);
  const [activeOptions, setActiveOptions] = React.useState([]);
  const activeOption = activeOptions[step] ?? 0;
  const questions = service?.questions || [];
  const question = questions.at(step);
  const dispatch = useDispatch();

  const nextStep = () => {
    if (step < questions?.length - 1) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };
  const onComplete = () => {
    const questionAnswer: QuestionAnswers = {};
    for (let i in questions) {
      questionAnswer[`question_${questions[i].id}`] = activeOptions[i];
    }
    dispatch(setQuestionAnswers(questionAnswer));
    props.onComplete();
  };
  const optionClicked = (op) => () => {
    activeOptions[step] = op.id;
    setActiveOptions([...activeOptions]);
  };
  return (
    <div
      className={clsx([
        "rounded-[32px] bg-white p-16 text-center",
        className,
        { shadow: shadow },
      ])}
    >
      {/* !question && "No question" */}
      <Loading loading={loading} backdrop={false} />
      {question && (
        <>
          {showSeq && (
            <div className="text-primary-main">
              {step + 1} of {questions?.length}
            </div>
          )}
          <div className="text-[4rem] font-medium">{question.question}</div>
          <div className="flex w-[75%] mx-auto my-12 gap-10 justify-center flex-wrap items-end">
            {question.options.map((op) => (
              <button
                key={op.id}
                className="text-base shadow-[0_8px_16px_0_#00000014] px-8 py-10 border rounded-[24px] flex items-center hover:bg-gray-50 text-gray-700"
                onClick={optionClicked(op)}
              >
                <input
                  type="radio"
                  name="service"
                  className="w-[2rem] h-[2rem]"
                  checked={activeOption == op.id}
                  onChange={optionClicked(op)}
                />
                <span className="mx-3">{op.option}</span>
              </button>
            ))}
          </div>
          <div className="space-x-12 py-6">
            <button
              className="fare-btn text-primary-main bg-gray-100 fare-btn-lg disabled:text-white"
              disabled={step <= 0}
              onClick={prevStep}
            >
              Previous
            </button>
            <button
              className="fare-btn fare-btn-primary fare-btn-lg"
              disabled={activeOption == 0}
              onClick={
                step < service.questions.length - 1 ? nextStep : onComplete
              }
            >
              {step < service.questions.length - 1 ? "Continue" : completeLabel}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
