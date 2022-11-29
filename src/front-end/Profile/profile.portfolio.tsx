import React, { useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HOST } from "../../constants";
export interface IProfilePortfolioProps {
  provider: IProvider;
}

export default function ProfilePortfolio(props: IProfilePortfolioProps) {
  const { provider } = props;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    variableWidth: true,
    centerMode: true,
    slidesToShow: 1,
    swipeToSlide: true,
    centerPadding: "10px",
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
  };
  const sliderRef = React.useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const onPrev = () => {
    sliderRef.current?.slickPrev();
  };
  const onNext = () => {
    console.log(sliderRef.current);
    sliderRef.current?.slickNext();
  };

  return (
    <div className="fare-card">
      <h1 className="text-xl">Portfolio</h1>
      <div className="2xl:w-[90rem] w-[64rem] m-auto">
        <Slider {...settings} ref={sliderRef}>
          {provider?.portfolios.map((p) => (
            <div className="p-3" key={p.id}>
              <img
                src={`${HOST}${p.image}`}
                className="w-[16rem] h-[16rem] rounded-xl object-cover"
                alt="Portfolio"
              />
              <div className="text-center p-2 w-[16rem] overflow-hidden whitespace-nowrap text-ellipsis ">
                {p.description}
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <hr className="border-top border-1 border-gray-300 mt-2 mb-4"></hr>
      <div className="d-flex justify-between items-center">
        <button
          className="fare-btn fare-btn-default text-gray-500"
          onClick={onPrev}
        >
          &lt;&ensp;Previous
        </button>
        {currentSlide + 1} of {provider?.portfolios.length}
        <button className="fare-btn fare-btn-primary" onClick={onNext}>
          Next&ensp;&gt;
        </button>
      </div>
    </div>
  );
}
