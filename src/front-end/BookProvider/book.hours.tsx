import * as React from "react";
import { range } from "underscore";
import RadioBoxButton from "../../components/button.radio";
import { getMinutesFromTimeString } from "../../helper/utils";
import { getScheduleAndBlockedSlotOFDate } from "./book.date";
export interface IBookHoursProps extends IBookSliderProps {
  onNext: (value: { hours: number }) => void;
}

export default function BookHours(props: IBookHoursProps) {
  const { onPrev, onNext } = props;
  const [hours, setHours] = React.useState(0);

  return (
    <div className="d-flex flex-column items-center gap-8">
      <span className="font-medium text-3xl">Select service hour(s)</span>
      <div className="grid grid-cols-6 gap-x-6 gap-y-12 w-[100rem]">
        {range(1, 13).map((h, i) => {
          return (
            <RadioBoxButton
              key={i}
              checked={h == hours}
              text={`${h} hours`}
              onChange={() => {
                setHours(h);
              }}
            />
          );
        })}
      </div>
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
            onNext({ hours });
          }}
          disabled={!hours}
        >
          Next
        </button>
      </div>
    </div>
  );
}
