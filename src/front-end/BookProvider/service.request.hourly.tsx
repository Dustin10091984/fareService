import * as React from "react";
import BookServiceDate from "./book.date";
import BookHours from "./book.hours";
import BookLocation from "./book.location";
import BookPaymentMethod from "./book.payment";
import BookQuotationSucceed from "./book.succeed";
import BookSummary from "./book.summary";
import BookTimeslot from "./book.timeslot";
import { ReactSwal } from "../../helper/swal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { postRequestService } from "../../store/Slices/services/RequestServiceSclice";
import { RootState } from "../../store";
import { getQuestionAnswers } from "../../store/Slices/services/QuestionAnswersSlice";
import Loading from "./../common/Loading";
import ServiceWizard from "../Services/services.wizard";
import ProfileServices from "../Profile/profile.services";
import BookServices from "./book.services";
import {
  getServiceQuestion,
  ServiceState,
} from "../../store/Slices/services/ServiceSclice";
import BookCheckoutPlan from "./book.subscription";
import BookSubscriptionPlan from "./book.plan";
export interface IBookServiceHourlyProps {
  close: () => void;
  provider: IProvider;
}

export default function BookServiceHourly(props: IBookServiceHourlyProps) {
  const quotationValues = React.useRef<IServiceRequestHourly>();
  const [sIndex, setSIndex] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const { close, provider } = props;
  const dispatch = useDispatch();
  const questionAnswers = useSelector<RootState>((state) =>
    getQuestionAnswers(state.questionAnswers)
  );
  const serviceRequest = useSelector<RootState, any>(
    (state) => state.serviceRequest
  );
  const service = useSelector<RootState, ServiceState>(
    (state) => state.service
  );
  const slideStartIndex = React.useMemo(() => {
    if (!service) return 0;
    if (!questionAnswers) return 1;
    return 2;
  }, []);
  const onPrev = () => {
    if (sIndex <= 0) return;
    setSIndex(sIndex - 1);
  };
  const onSubmit = async () => {
    console.log(quotationValues.current);
    try {
      const result = await dispatch(
        postRequestService(
          {
            ...quotationValues.current,
            //plan_id: 0,
            questions: questionAnswers,
            is_hourly: true,
            provider_id: provider?.id,
          },
          false
        )
      );
      console.log(result);
      setSubmitted(true);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const onNext = async (values: Partial<IServiceRequestHourly>) => {
    quotationValues.current = { ...quotationValues.current, ...values };
    if (sIndex >= slides.length - 1) {
      await onSubmit();
      return;
    }
    setSIndex(sIndex + 1);
  };

  let slides = [
    <BookServices
      provider={provider}
      onNext={async ({ service }) => {
        onNext({ service });
        dispatch(getServiceQuestion(service.sub_service.id));
      }}
    />,
    <ServiceWizard
      className="self-stretch"
      service={service?.data}
      loading={service?.loading}
      config={{ shadow: false, showSeq: false, completeLabel: "Book" }}
      onComplete={() => {
        onNext({});
      }}
    />,
    <BookServiceDate
      schedules={provider?.schedules}
      blockedSlots={provider?.blocked_slots}
      onNext={({ date }) => {
        onNext({ date: date.toLocaleDateString() });
      }}
    />,
    <BookHours onNext={onNext} onPrev={onPrev} />,
    <BookTimeslot
      onPrev={onPrev}
      onNext={onNext}
      schedules={provider?.schedules}
      blockedSlots={provider?.blocked_slots}
      date={quotationValues.current?.date}
    />,
    <BookLocation
      onPrev={onPrev}
      onNext={({ location }) => {
        onNext({ address: location.label });
      }}
      title="Work Address"
    />,
    <BookCheckoutPlan
      onNext={({ checkoutPlan }) => {
        onNext({ checkoutPlan });
      }}
    />,
    <BookPaymentMethod
      onPrev={onPrev}
      onNext={onNext}
      provider={provider}
      {...quotationValues.current}
    />,
    <BookSummary
      payMethod={quotationValues.current?.payMethod}
      provider={provider}
      nextLabel="Confirm request"
      onPrev={onPrev}
      onNext={onSubmit}
      {...quotationValues.current}
    />,
  ];
  slides = slides.slice(slideStartIndex);

  return (
    <div className="fare-card w-[108rem] max-h-[100vh] overflow-auto">
      <div className="d-flex flex-column items-center">
        {serviceRequest.loading && <Loading loading={true} />}
        {!submitted && (
          <>
            <div className="text-primary-main py-3">
              {sIndex + 1} of {slides.length}
            </div>
            <button
              className="fare-btn fare-btn-default fare-btn-large absolute right-8 top-8"
              onClick={close}
            >
              <i className="la la-times mr-2 "></i>Close
            </button>
            {slides.map((s, index) => {
              return index == sIndex ? s : "";
            })}
          </>
        )}
        {submitted && (
          <BookQuotationSucceed
            onDone={close}
            title="Request Processed"
            subTitle="Your service have been booked successfully"
          />
        )}
      </div>
    </div>
  );
}
