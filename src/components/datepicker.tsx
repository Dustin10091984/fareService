import * as React from "react";
import Calendar, {
  CalendarProps,
  CalendarTileProperties,
} from "react-calendar";
import "react-calendar/dist/Calendar.css";
export type IFareDatePickerProps = {} | CalendarProps;

export default function FareDatePicker(props: IFareDatePickerProps) {
  const today = new Date(new Date().toDateString());
  const tileDisabled = ({
    activeStartDate,
    date,
    view,
  }: CalendarTileProperties) => {
    if (date < today) return true;
    return false;
  };
  const tileClassName = ({ date }: CalendarTileProperties) => {
    if (date.getDate() == 5) {
      return "blocked";
    }
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
