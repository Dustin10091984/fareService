import * as React from "react";
import { range } from "underscore";
import RadioBoxButton from "../../components/button.radio";
import { getMinutesFromTimeString } from "../../helper/utils";
import { getScheduleAndBlockedSlotOFDate } from "./book.date";
export interface IBookServicesProps extends IBookSliderProps {
  onNext: (value: { service: IProviderService }) => void;
  provider: IProvider;
}

export default function BookServices(props: IBookServicesProps) {
  const { onPrev, onNext } = props;
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const { provider_services: services = [] } = props.provider;

  return (
    <div className="d-flex flex-column items-center gap-8">
      <span className="font-medium text-3xl">Select a service</span>
      <div className="flex flex-wrap gap-x-6 gap-y-12 w-[100rem] justify-center">
        {services.map((service, i) => {
          return (
            <RadioBoxButton
              key={i}
              checked={i == activeIndex}
              text={`${service.sub_service.name}`}
              onChange={() => {
                setActiveIndex(i);
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
            activeIndex >= 0 && onNext({ service: services[activeIndex] });
          }}
          disabled={activeIndex == -1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
