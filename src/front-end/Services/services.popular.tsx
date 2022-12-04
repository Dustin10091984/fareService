import * as React from "react";
import { clsx } from "clsx";
import Slider from "react-slick";
import ServiceType from "../../constants/ServiceType";
import { Link } from "react-router-dom";
import { HOST } from "../../constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface IPopularServicesProps {
  services: IService[];
}
const makeArrowComponent =
  (direction?: "left" | "right") =>
  (props: { className?: string; style?: any; onClick?: any }) => {
    return (
      <div
        {...props}
        className={clsx([
          "shadow absolute text-primary-main text-xl bg-white w-[6.4rem] h-[6.4rem] rounded-[2.4rem] z-10 text-center",
          direction === "left" ? "left-[-20px]" : "right-[-20px]",
        ])}
        style={{ top: `calc(50% - 3.2rem)` }}
      >
        {direction === "left" ? (
          <i className="fa fa-angle-left text-3xl leading-[6.0rem] "></i>
        ) : (
          <i className="fa fa-angle-right text-3xl leading-[6.0rem] "></i>
        )}
      </div>
    );
  };
const NextArrowComponent = makeArrowComponent("right");
const PrevArrowComponent = makeArrowComponent("left");
export default function PopularServices(props: IPopularServicesProps) {
  const { services } = props;
  const [activeServiceIndex, setActiveServiceIndex] = React.useState<number>(0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(
      services[activeServiceIndex]?.sub_services?.length || 0,
      4
    ),
    slidesToScroll: 1,
    prevArrow: <PrevArrowComponent />,
    nextArrow: <NextArrowComponent />,
  };
  return (
    <div className="space-y-6 flex-col d-flex items-center">
      <h1 className="text-4xl text-primary-main">Popular Services</h1>
      <p className="text-base text-gray-500">
        Explore our top services. All our services are designed with you in
        mind.
      </p>
      <div className="bg-primary-light p-3 px-4 d-flex space-x-4 rounded-[24px]">
        {services.map((service, index) => (
          <button
            className={clsx([
              "rounded-[16px] px-3 py-2 text-base text-gray-600",
              { "bg-primary-main text-white": activeServiceIndex == index },
            ])}
            key={service.id}
            onClick={() => {
              setActiveServiceIndex(index);
            }}
          >
            {service.name}
          </button>
        ))}
      </div>
      <div className="w-100 px-12">
        <Slider {...settings}>
          {services &&
            services
              .at(activeServiceIndex)
              ?.sub_services?.map((subService, index) => {
                const item = services?.at(activeServiceIndex);
                return (
                  item && (
                    <div className="p-3">
                      <div
                        key={`${index}_${activeServiceIndex}`}
                        className="service-box h-[30rem] w-100 m-0"
                      >
                        <Link
                          to={`/services/search?subService=${subService.id}`}
                        >
                          <img
                            src={
                              (subService.image && HOST + subService.image) ||
                              ""
                            }
                            loading="lazy"
                            className="img-fluid"
                            alt=""
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/assets/img/service1.jpg";
                            }}
                          />
                          <div className="absolute text-xl bottom-0 p-4 flex items-center justify-center text-center text-white w-100 leading-tight sub-service-name">
                            {subService.name}
                          </div>
                        </Link>
                      </div>
                    </div>
                  )
                );
              })}
        </Slider>
      </div>
    </div>
  );
}
