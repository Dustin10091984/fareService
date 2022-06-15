import { memo } from "react";
import moment from "moment";

const WorkStatus = memo(({ serviceRequest }) => {
    return (
        <>
            {
                (() => {
                    if (serviceRequest.status === "PENDING") {
                        return "Pending";
                    }
                    if (serviceRequest.working_status == null) {
                        return "Not Started yet!";
                    }

                    if (serviceRequest.working_status == "STARTED") {
                        if (serviceRequest?.worked_times?.length > 0) {
                            let breakTime = 0;
                            let started = moment(
                                serviceRequest.worked_times[0].start_at
                            );
                            serviceRequest?.worked_times?.forEach((time) => {
                                if (time.is_pause && time.end_at != null) {
                                    breakTime = moment(time.start_at).diff(
                                        time.end_at,
                                        "seconds"
                                    );
                                }
                            });
                            let now = moment();
                            let duration = moment.duration(now.diff(started));
                            duration = duration.subtract(
                                moment(breakTime),
                                "seconds"
                            );
                            // `${ duration.asDays().toFixed( 0 ) > 0 ? duration.asDays().toFixed(0) + "d" : ""}`
                            return `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
                        }
                        return "Started";
                    }

                    if (serviceRequest.working_status == "PAUSED") {
                        return "Paused";
                    }

                    if (
                        serviceRequest.working_status == "ENDED" &&
                        serviceRequest.is_completed == true
                    ) {
                        return "Completed";
                    }
                })()
                // serviceRequest?.payable_amount != null ? "$"+(parseInt(serviceRequest?.payable_amount) + parseInt(serviceRequest?.paid_amount)) : "$"+serviceRequest?.paid_amount
            }
        </>
    );
});

export { WorkStatus };
