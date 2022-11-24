import * as React from "react";
import { range } from "underscore";
import clsx from "clsx";
import RadioBoxButton from "../../components/button.radio";

export interface IBookTimeslotProps<T> {
  onPrev?: () => void;
  onNext?: (values: Partial<T>) => void;
}
const toHourString = (hour: number) => {
  return `${hour % 12 || 12} ${hour >= 12 ? "am" : "pm"}`;
};
export default function BookTimeslot(
  props: IBookTimeslotProps<IServiceRequestHourly>
) {
  const slots = [
    [6, 12],
    [12, 17],
    [18, 22],
  ];
  const { onPrev, onNext } = props;
  const slotNames = ["Morning", "Afternoon", "Evening"];
  const [slot, setSlot] = React.useState(0); // slot index, ex. morning, afternoon...
  const [times, setTimes] = React.useState([]);
  return (
    <div className="d-flex flex-column items-center gap-8">
      <span className="font-medium text-3xl">Select times slot</span>
      <p>Provider preferred time 10:00AM to 04:00 PM </p>
      <div className="grid grid-cols-3 gap-x-6 gap-y-12 w-[90rem]">
        {slots.map((s, i) => {
          return (
            <RadioBoxButton
              key={i}
              checked={i == slot}
              text={`${slotNames[i]} (${toHourString(s[0])} - ${toHourString(
                s[1]
              )})`}
              onChange={() => {
                setSlot(i);
              }}
            />
          );
        })}

        {range(slots[slot][0], slots[slot][1]).map((t) => {
          return (
            <button
              key={t}
              className={clsx([
                "text-base shadow-[0_8px_16px_0_#00000014] px-8 py-10 border-2 rounded-[24px] hover:bg-gray-50 text-gray-700 text-center",
                { "bg-primary text-white": times.includes(t) },
              ])}
              onClick={() => {
                if (times.includes(t)) times.splice(times.indexOf(t), 1);
                else times.push(t);
                setTimes([...times]);
              }}
            >
              {`${toHourString(t).toUpperCase()} - ${toHourString(
                t + 1
              ).toUpperCase()}`}
            </button>
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
            const timeSlots = times.map((t) => {
              return {
                start: `${("0" + t).slice(-2)}:00`,
                end: `${("0" + (t + 1)).slice(-2)}:00`,
              };
            });
            onNext({
              book_time_slots: timeSlots,
            });
          }}
          disabled={!times.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
