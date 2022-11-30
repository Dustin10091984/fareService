import * as React from "react";
import FareDatePicker from "../../components/datepicker";
import LocationInput from "../../components/input.location";
import BookServiceDate from "./book.date";
import BookLocation from "./book.location";
import BookPaymentMethod from "./book.payment";
import BookQuotationForm, { IBookQuotationFormRef } from "./book.quotation";
import BookQuotationSucceed from "./book.succeed";
import BookTimeslot from "./book.timeslot";
import { useDispatch, useSelector } from "react-redux";
import { postRequestService } from "../../store/Slices/services/RequestServiceSclice";
import { RootState } from "../../store";
import { getQuestionAnswers } from "../../store/Slices/services/QuestionAnswersSlice";
import Loading from "./../common/Loading";

export interface IBookProviderProps {
  close?: () => void;
  provider: IProvider;
}

export default function BookProviderQuotation(props: IBookProviderProps) {
  const quotationFormRef = React.useRef<IBookQuotationFormRef>();
  const quotationValues = React.useRef<any>();
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
            is_hourly: false,
            provider_id: provider.id,
            questions: questionAnswers,
          },
          false
        )
      );
      setSubmitted(true);
    } catch (e) {}
  };
  const onNext = (values: any) => {
    quotationValues.current = { ...quotationValues.current, ...values };
    if (sIndex >= slides.length - 1) {
      onSubmit();
      return;
    }
    setSIndex(sIndex + 1);
  };
  const slides = [
    /*  <BookServiceDate
      onNext={onNext}
      schedules={provider?.schedules}
      blockedSlots={provider?.blocked_slots}
    />,
    <BookTimeslot
      onPrev={onPrev}
      onNext={onNext}
      schedules={provider?.schedules}
      blockedSlots={provider?.blocked_slots}
      date={quotationValues.current?.date}
    />,
    <BookLocation
      onPrev={onPrev}
      onNext={onNext}
      nextLabel="Get quotation"
      title="Where is your home?"
    />, */
    <BookQuotationForm onNext={onNext} />,
  ];
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
              <i className="fa fa-times mr-2 "></i>Close
            </button>
            {slides.map((s, index) => {
              return index == sIndex ? s : <></>;
            })}
          </>
        )}
        {submitted && (
          <BookQuotationSucceed
            onDone={close}
            title="Quotation Submitted"
            subTitle="Your form have been submitted successfully"
          />
        )}
      </div>
    </div>
  );
}
