import { useState, useEffect, memo } from "react";
import moment from "moment";
import React from "react";

interface IWorkStatusProps {
  serviceRequest: IServiceRequest;
}
const WorkStatus = memo(({ serviceRequest }: IWorkStatusProps) => {
  const [state, setState] = useState<{ second: number }>({ second: 0 });
  useEffect(() => {
    const interval = setInterval(() => {
      setState((state) => ({ ...state, second: state.second + 1 }));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="workstatus-container">
      {
        (() => {
          if (!serviceRequest) return <></>;
          if (serviceRequest.status === "PENDING") {
            return <div className="bg-yellow-400 text-dark">Pending</div>;
          }
          if (serviceRequest.working_status == null) {
            return <div className="bg-red-500">Not Started yet!</div>;
          }

          if (serviceRequest.working_status == "STARTED") {
            if (serviceRequest?.worked_times?.length > 0) {
              let breakTime = 0;
              let started = moment(serviceRequest.worked_times[0].created_at);
              serviceRequest?.worked_times?.forEach((time) => {
                if (time.is_paused && time.updated_at != null) {
                  breakTime = moment(time.created_at).diff(
                    time.updated_at,
                    "seconds"
                  );
                }
              });
              let now = moment();
              let duration = moment.duration(now.diff(started));
              duration = duration.subtract(breakTime, "seconds");
              // `${ duration.asDays().toFixed( 0 ) > 0 ? duration.asDays().toFixed(0) + "d" : ""}`
              return <div className="text-base text-primary-main font-medium">{`${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`}</div>;
            }
            return <div className="bg-green-500">Started</div>;
          }

          if (serviceRequest.working_status == "PAUSED") {
            return <div className="bg-orange-500">Paused</div>;
          }

          if (
            serviceRequest.working_status == "ENDED" &&
            serviceRequest.is_completed == true
          ) {
            return <div className="bg-gray-300 text-dark">Completed</div>;
          }
        })()
        // serviceRequest?.payable_amount != null ? "$"+(parseInt(serviceRequest?.payable_amount) + parseInt(serviceRequest?.paid_amount)) : "$"+serviceRequest?.paid_amount
      }
    </div>
  );
});

export { WorkStatus };
