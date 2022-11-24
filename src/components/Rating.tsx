import React from "react";
interface IRatingProps {
  isCenter?: boolean;
  rating?: number;
  justify?: boolean;
  className?: string;
  onChange?: (value: number) => void;
}
const Rating = ({
  isCenter = true,
  rating = 0,
  justify = false,
  className = "",
  onChange,
}: IRatingProps) => {
  const values = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5];
  let ratingValue = Number(rating.toFixed(1));
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
          {/* <label
            className="full"
            title="{{ 'Awesome - 5 stars' | translate }}"
            onClick={() => {
              onChange(5);
            }}
          ></label>
          <label
            className="half"
            title="{{ 'Excellent - 4.5 stars' | translate }}"
            onClick={() => {
              onChange(4.5);
            }}
          ></label>
          <label
            className="full"
            title="{{ 'Excellent - 4 stars' | translate }}"
            onClick={() => {
              onChange(4);
            }}
          ></label>
          <label
            className="half"
            title="{{ 'Better - 3.5 stars' | translate }}"
            onClick={() => {
              onChange(3.5);
            }}
          ></label>
          <label
            className="full"
            title="{{ 'Good - 3 stars' | translate }}"
          ></label>
          <label
            className="half"
            title="{{ 'Good - 2.5 stars' | translate }}"
          ></label>
          <label
            className="full"
            title="{{ 'Fair - 2 stars' | translate }}"
          ></label>
          <label
            className="half"
            title="{{ 'Fair - 1.5 stars' | translate }}"
          ></label>
          <label
            className="full"
            title="{{ 'Bad - 1 star' | translate }}"
          ></label>
          <label
            className="half"
            title="{{ 'Bad - 0.5 stars' | translate }}"
          ></label> */}
        </div>
        {/* <div className="ratilike ng-binding">5</div> */}
      </div>
    </div>
  );
};
export default Rating;
