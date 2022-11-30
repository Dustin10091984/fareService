import * as React from "react";
import FareDatePicker from "../../components/datepicker";
import { getTimeString } from "../../helper/utils";

export interface IBookServiceDateProps extends IBookSliderProps {
  onPrev?: () => void;
  onNext?: (values: { date: Date }) => void;
  schedules?: ISchedule[];
  blockedSlots?: IBlockedSlot[];
}
export const getScheduleAndBlockedSlotOFDate = (
  date: Date,
  schedules: ISchedule[],
  blockedSlots: IBlockedSlot[]
) => {
  if (!date) return [];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDay = weekDays[date.getDay()];
  const schedule = schedules.find((s) => s.day.startsWith(weekDay));

  const slot = blockedSlots.find((s) => {
    return date.toISOString() == new Date(`${s.date} 00:00:00`).toISOString();
  });

  return [schedule, slot];
};
export default function BookServiceDate(props: IBookServiceDateProps) {
  const { onNext, schedules = [], blockedSlots = [] } = props;
  const [serviceDate, setServiceDate] = React.useState<Date>();
  const isBlocked = (date: Date) => {
    const [schedule, slot] = getScheduleAndBlockedSlotOFDate(
      date,
      schedules,
      blockedSlots
    );
    /** no schdule - block day */
    if (!schedule) return true;
    if (
      slot &&
      slot.from_time <= schedule.from_time &&
      slot.to_time >= schedule.to_time
    ) {
      return true;
    }
    return false;
  };
  const [schedule] = getScheduleAndBlockedSlotOFDate(
    serviceDate,
    schedules,
    blockedSlots
  );
  return (
    <div className="d-flex flex-column items-center gap-8">
      <span className="font-medium text-3xl">Select service date</span>
      {schedule && (
        <p>
          Provider preferred time {getTimeString(schedule.from_time)}
          &ensp;to&ensp;
          {getTimeString(schedule.to_time)}{" "}
        </p>
      )}
      <FareDatePicker
        isBlocked={isBlocked}
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
