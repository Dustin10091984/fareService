import React from "react";
interface IRatingProps {
  isCenter?: boolean;
  rating?: number;
  justify?: boolean;
  className?: string;
  oneStar?: boolean;
  onChange?: (value: number) => void;
}
export const RatingWithLabel = (props: IRatingProps) => {
  let { rating = 0, className } = props;
  rating = Math.round(Number(rating || 0) * 10) / 10;
  return (
    <span className={className}>
      <i className="fa fa-star text-orange-400"></i>
      &nbsp;
      <b>{rating}</b> &nbsp;
    </span>
  );
};

const Rating = ({
  isCenter = true,
  rating = 0,
  justify = false,
  className = "",
  oneStar = false,
  onChange,
}: IRatingProps) => {
  const values = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5];

  let ratingValue = Math.round(Number(rating) * 10) / 10;

  return (
    <div className={"star-rating-area text-base" + " " + className}>
      <div
        className={`star-rating-area d-flex align-items-center justify-content-${
          justify ? justify : isCenter !== false ? "center" : "start"
        }`}
      >
        <div className="rating-static clearfix mr-3" data-rel={ratingValue}>
          {values.map((v) => (
            <label
              key={v}
              className={Math.floor(v * 2) % 2 == 0 ? "full" : "half"}
              onClick={() => {
                onChange && onChange(v);
              }}
            ></label>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Rating;
