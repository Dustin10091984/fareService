import * as React from "react";
import { useDispatch } from "react-redux";
import { setQuestionAnswers } from "../../store/Slices/services/QuestionAnswersSlice";
import { clsx } from "clsx";
import Loading from "./../common/Loading";
import LocationInput from "components/input.location";
import RadioBoxButton from "components/button.radio";

export interface IServiceWizardProps {
  service: IService;
  loading?: boolean;
  //  placeId?: string;
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
      showSeq = true,
      completeLabel = "Get Providers",
    } = {},
    className = "",
    loading = false,
    //  placeId,
  } = props;
  const { service } = props;
  const [step, setStep] = React.useState(0);
  const [activeOptions, setActiveOptions] = React.useState<number[][]>([]);
  const activeOption = activeOptions[step] ?? [];

  const questions = service?.questions || [];
  const dispatch = useDispatch();

  const radioOptionClicked = (op) => {
    activeOptions[step] = [op.id];
    setActiveOptions([...activeOptions]);
  };
  const checkboxOptionClicked = (op, checked) => {
    let activeOptionTemp = activeOption;
    if (checked) activeOptionTemp.push(op.id);
    else {
      activeOptionTemp = activeOption.filter((x) => x != op.id);
    }
    activeOptions[step] = activeOptionTemp;
    setActiveOptions([...activeOptions]);
  };
  const optionClicked = (op, isMultiple: boolean) => (checked: boolean) => {
    if (isMultiple) {
      checkboxOptionClicked(op, checked);
    } else {
      radioOptionClicked(op);
    }
  };

  let sections = [];
  // if (!placeId) {
  //   sections.push(locationSection);
  // }
  sections = sections.concat(
    questions?.map((question) => (
      <>
        <div className="text-[4rem] font-medium">{question.question}</div>
        <div className="flex w-[75%] mx-auto my-12 gap-10 justify-center flex-wrap items-end">
          {question.options.map((op) => (
            <RadioBoxButton
              key={op.id}
              type={question.is_multiple ? "checkbox" : "radio"}
              checked={activeOption.includes(op.id)}
              onChange={optionClicked(op, question.is_multiple)}
              text={op.option}
            />
            // <button
            //   key={op.id}
            //   className="text-base shadow-[0_8px_16px_0_#00000014] px-8 py-10 border rounded-[4px] flex items-center hover:bg-gray-50 text-gray-700"
            //   onClick={optionClicked(op)}
            // >
            //   <input
            //
            //     name="service"
            //     className="w-[2rem] h-[2rem]"
            //     checked={activeOption == op.id}
            //     onChange={optionClicked(op)}
            //   />
            //   <span className="mx-3">{op.option}</span>
            // </button>
          ))}
        </div>
      </>
    ))
  );

  const total = sections?.length;
  const nextDisabled = !(step < total) || activeOption.length <= 0;

  const nextStep = () => {
    if (step < total - 1) {
      setStep(step + 1);
    }
  };
  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };
  const onComplete = () => {
    const questionAnswer: QuestionAnswers = {};
    for (let i in questions) {
      questionAnswer[`question_${questions[i].id}`] = questions[i].is_multiple
        ? activeOptions[i]
        : activeOption[i][0];
    }
    dispatch(setQuestionAnswers(questionAnswer));
    props.onComplete();
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
      {
        <>
          {showSeq && (
            <div className="text-primary-main">
              {step + 1} of {total}
            </div>
          )}
          {sections[step]}
          <div className="space-x-12 py-6">
            {total > 1 && (
              <button
                className="fare-btn text-primary-main bg-gray-100 fare-btn-lg disabled:text-white"
                disabled={step <= 0}
                onClick={prevStep}
              >
                Previous
              </button>
            )}
            <button
              className="fare-btn fare-btn-primary fare-btn-lg"
              disabled={nextDisabled}
              onClick={step < total - 1 ? nextStep : onComplete}
            >
              {step < total - 1 ? "Continue" : completeLabel}
            </button>
          </div>
        </>
      }
    </div>
  );
}
