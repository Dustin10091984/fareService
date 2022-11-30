import * as React from "react";
import { getTimeString } from "../../helper/utils";

export interface IProfileAvailabilityProps {
  provider: IProvider;
}
export default function ProfileAvailability(props: IProfileAvailabilityProps) {
  const {
    provider: { schedules },
  } = props;
  const days = schedules?.map((sch) => sch.day.substring(0, 3)) || [];
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <div className="fare-card">
      <h1>Preferred Availability</h1>
      <div className="d-flex items-center text-gray-500">
        <i className="fas fa-calendar text-emerald-400 p-3 bg-emerald-100 rounded-xl mx-3"></i>
        Days:&ensp;
        <div>
          {days.length > 0 &&
            days.map((d, i) => (
              <>
                {i != 0 && <>,&ensp;</>}
                <span
                  className="text-emerald-400 cursor-pointer"
                  onClick={() => setSelectedIndex(i)}
                >
                  {d}
                </span>
              </>
            ))}
          {!days.length && (
            <span className="text-emerald-400">
              Mon&ensp;<span className="text-gray-500">to</span>&ensp;Fri
            </span>
          )}
        </div>
      </div>
      <hr className="my-3" />
      <div className="text-gray-500">
        <i className="fas fa-clock text-emerald-400 p-3 bg-emerald-100 rounded-xl mx-3"></i>
        Time:&ensp;
        <span className="text-emerald-400">
          {getTimeString(schedules?.at(selectedIndex)?.from_time) || "10:00 AM"}
        </span>
        &ensp;to&ensp;
        <span className="text-emerald-400">
          {getTimeString(schedules?.at(selectedIndex)?.to_time) || "04:00 PM"}
        </span>
      </div>
    </div>
  );
}
