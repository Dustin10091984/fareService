import * as React from "react";
import Calendar, {
  CalendarProps,
  CalendarTileProperties,
} from "react-calendar";
import "react-calendar/dist/Calendar.css";
export type IFareDatePickerProps = {
  isBlocked?: (date: Date) => boolean;
} & CalendarProps;

export default function FareDatePicker(props: IFareDatePickerProps) {
  const today = new Date(new Date().toDateString());
  const tileDisabled = ({
    activeStartDate,
    date,
    view,
  }: CalendarTileProperties) => {
    if (view != "month") return false;
    if (date < today) return true;
    if (props.isBlocked) return props.isBlocked(date);
    return false;
  };
  const tileClassName = ({ date, view }: CalendarTileProperties) => {
    if (view != "month") return "";
    if (props.isBlocked && props.isBlocked(date)) return "blocked";
    return "";
  };
  return (
    <Calendar
      {...props}
      calendarType="US"
      className="fare-datepicker"
      tileDisabled={tileDisabled}
      tileClassName={tileClassName}
    />
  );
}
