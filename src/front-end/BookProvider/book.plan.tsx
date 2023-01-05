import * as React from "react";
import SubscriptionPlan from "../../components/Payment/subscription.plan";
import Slider from "react-slick";
import Empty from "../../components/Empty";

export interface IBookSubscriptionPlanProps extends IBookSliderProps {
  provider: IProviderBase;
  onNext: (value: { plan_id: number }) => void;
}

export default function BookSubscriptionPlan(
  props: IBookSubscriptionPlanProps
) {
  const { provider, onNext, onPrev, prevLabel } = props;
  const [selectedPlan, setSelectedPlan] = React.useState(0);
  let plans = provider?.plans ?? [];
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: Math.min(3, plans.length),
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className="d-flex flex-column items-center gap-8 max-w-[84rem] w-100">
      <span className="font-medium text-3xl">Payment</span>
      <div className="text-center">
        <div className="text-xl text-gray-600">Choose a plan</div>
        <div className="text-[1.6rem] text-gray-300">
          Select the offer that best suits your need
        </div>
      </div>
      <div className="w-100 mb-5">
        {!(plans?.length > 0) && (
          <div className="flex-grow-1 flex justify-center items-center h-[10rem]">
            <Empty
              text="No Plans"
              icon="archive"
              className="text-gray-500 text-2xl"
            />
          </div>
        )}
        <Slider {...settings}>
          {plans?.map((plan) => {
            return (
              <div className="px-3 py-5">
                <div className="m-auto  max-w-[30rem]">
                  <SubscriptionPlan
                    plan={plan}
                    key={plan.id}
                    active={selectedPlan === plan.id}
                    onNext={() => {
                      onNext({ plan_id: plan.id });
                    }}
                    onSelect={() => {
                      setSelectedPlan(plan.id);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="gap-8 d-flex">
        {onPrev && (
          <button
            className="fare-btn fare-btn-default fare-btn-lg"
            onClick={onPrev}
          >
            {prevLabel}
          </button>
        )}
      </div>
    </div>
  );
}
