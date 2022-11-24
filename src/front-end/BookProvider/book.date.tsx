import * as React from "react";
import FareDatePicker from "../../components/datepicker";

export interface IBookServiceDateProps extends IBookSliderProps {
  onPrev?: () => void;
  onNext?: (values: { date: Date }) => void;
}

export default function BookServiceDate(props: IBookServiceDateProps) {
  const { onNext } = props;
  const [serviceDate, setServiceDate] = React.useState<Date>();
  return (
    <div className="d-flex flex-column items-center gap-8">
      <span className="font-medium text-3xl">Select service date</span>
      <p>Provider preferred time 10:00AM to 04:00 PM </p>
      <FareDatePicker
        onChange={(e) => {
          setServiceDate(e);
        }}
      />
      <button
        className="fare-btn fare-btn-primary fare-btn-lg"
        onClick={() => {
          onNext({ date: serviceDate });
        }}
        disabled={!serviceDate}
      >
        Continue
      </button>
    </div>
  );
}
