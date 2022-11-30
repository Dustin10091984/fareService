import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Empty from "../../components/Empty";
import { padNumber } from "../../helper/utils";
import { dispatch, RootState } from "../../store";
import {
  getServiceRequest,
  getServiceRequestList,
} from "../../store/Slices/services/RequestServiceSclice";

export interface IProfileWorkHistoryProps {
  provider: IProvider;
}
export default function ProfileWorkHistory(props: IProfileWorkHistoryProps) {
  const { provider } = props;
  const { error, message, data } = useSelector<
    RootState,
    DataResponse<IServiceRequest[]>
  >((state) => state.serviceRequest.list ?? {});

  const [tabIndex, setTabIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState([0, 0]);

  const dataForTabs = [1, 0].map(
    (is_completed) =>
      data?.filter((d) => !!d.is_completed === !!is_completed) || []
  );
  const currentTabData = dataForTabs[tabIndex];
  const totalPageSize = Math.ceil(currentTabData?.length / 2);
  const currentPageIndex = pageIndex[tabIndex];

  const onPrev = () => {
    pageIndex[tabIndex] = Math.max(0, pageIndex[tabIndex] - 1);
    setPageIndex([...pageIndex]);
  };
  const onNext = () => {
    if (pageIndex[tabIndex] + 1 < totalPageSize) {
      pageIndex[tabIndex]++;
      setPageIndex([...pageIndex]);
    }
  };
  const isNextDisabled = currentPageIndex + 1 >= totalPageSize;

  useEffect(() => {
    dispatch(
      getServiceRequestList({
        params: `provider_id=${provider.id}&type=ongoing&type=completed`,
      })
    ).then(() => {
      setPageIndex([0, 0]);
    });
  }, [provider.id]);

  return (
    <div className="fare-card">
      <h1>Work History</h1>
      <ul className="fare-tabs nav nav-tabs nav-fill">
        <li className="nav-item">
          <a
            className={clsx("nav-link", { active: tabIndex == 0 })}
            onClick={() => setTabIndex(0)}
          >
            Completed({padNumber(dataForTabs[0]?.length, 2)})
          </a>
        </li>
        <li className="nav-item">
          <a
            className={clsx("nav-link", { active: tabIndex == 1 })}
            onClick={() => setTabIndex(1)}
          >
            On Going({padNumber(dataForTabs[1]?.length, 2)})
          </a>
        </li>
      </ul>

      <div className="min-h-[30rem] pt-3 flex flex-column">
        {currentTabData?.length > 0 &&
          currentTabData
            .slice(currentPageIndex * 2, currentPageIndex * 2 + 2)
            .map((d) => {
              let { start_at = "", end_at = "" } = d.worked_times?.at(0) ?? {};
              if (start_at) start_at = new Date(start_at).toDateString();
              if (end_at) end_at = new Date(end_at).toDateString();
              return (
                <React.Fragment key={d.id}>
                  <div className="p-3">
                    <h2 className="text-base font-medium text-primary-main">
                      {d.sub_service}&ensp;{d.address}
                    </h2>
                    <div className="text-[1.6rem] text-dark">
                      {start_at} - {end_at}
                    </div>
                    <div className="text-xs mt-2">
                      {d.is_completed ? "Completed" : "On Going"}
                    </div>
                    <div className="text-xs space-x-24">
                      <span>
                        <b>${d.paid_amount || 0}</b>
                      </span>
                      <span>
                        <b>${d.provider?.provider_profile?.hourly_rate || 0}</b>
                        /hr
                      </span>
                      <span>
                        <b>{d.worked_hours || 0} </b>hours
                      </span>
                    </div>
                  </div>
                  <hr className="my-3" />
                </React.Fragment>
              );
            })}
        {!currentTabData?.length && (
          <div className="flex-grow-1 flex justify-center items-center">
            <Empty className="text-gray-500" />
          </div>
        )}
      </div>
      <div className="d-flex justify-between items-center">
        <button
          className="fare-btn fare-btn-default text-gray-500"
          disabled={!currentPageIndex}
          onClick={onPrev}
        >
          &lt;&ensp;Previous
        </button>
        {pageIndex[tabIndex] + 1} of {totalPageSize}
        <button
          className="fare-btn fare-btn-primary"
          disabled={isNextDisabled}
          onClick={onNext}
        >
          Next&ensp;&gt;
        </button>
      </div>
    </div>
  );
}
