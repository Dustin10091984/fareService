import moment from "moment";
import React, { useMemo } from "react";
import DayPicker, { DateUtils } from "react-day-picker";

const HourlyRequest = ({ providerSchedule, value, handleCalendarClick }) => {
    const available = `.DayPicker-Day--highlighted {
                            background-color: orange;
                            color: black;
                        }`;

    const date = new Date();

    const modifiers = useMemo(() => {
        return {
            highlighted: [
                ...(providerSchedule?.map((schedule) => {
                    if (
                        moment(moment().format("YYYY-MM-DD")).isSameOrBefore(
                            moment(
                                new Date(
                                    `${schedule?.provider_schedule?.year}-${schedule?.provider_schedule?.month}-${schedule?.provider_schedule?.date}`
                                )
                            )
                        )
                    ) {
                        return new Date(
                            `${schedule?.provider_schedule?.year}-${schedule?.provider_schedule?.month}-${schedule?.provider_schedule?.date}`
                        );
                    }
                }) || []),
            ],
        };
    }, [providerSchedule]);

    const disabledDays = useMemo(() => {
        return [
            ...(providerSchedule?.map((schedule) => {
                if (
                    moment(moment().format("YYYY-MM-DD")).isSameOrBefore(
                        moment(
                            new Date(
                                `${schedule?.provider_schedule?.year}-${schedule?.provider_schedule?.month}-${schedule?.provider_schedule?.date}`
                            )
                        )
                    )
                ) {
                    return new Date(
                        `${schedule?.provider_schedule?.year}-${schedule?.provider_schedule?.month}-${schedule?.provider_schedule?.date}`
                    );
                }
            }) || []),
        ];
    }, [providerSchedule]);

    function isDayDisabled(day) {
        return !disabledDays.some(
            (disabledDay) =>
                DateUtils.isSameDay(day, disabledDay) &&
                !DateUtils.isDayBefore(day, date)
        );
    }

    return (
        <div>
            <style>{available}</style>
            <DayPicker
                showOutsideDays
                modifiers={modifiers}
                month={date}
                selectedDays={value}
                disabledDays={isDayDisabled}
                fromMonth={date}
                onDayClick={(day, { highlighted }) => {
                    if (highlighted) handleCalendarClick(day);
                }}
            />
        </div>
    );
};

export { HourlyRequest };
