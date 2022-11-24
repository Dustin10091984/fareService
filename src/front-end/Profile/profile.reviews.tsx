import * as React from "react";
import Rating from "../../components/Rating";
export interface IProfileReviewsProps {
  provider: IProvider;
}
export interface IUserFeedbackProps {}
export const UserFeedback = (props: IUserFeedbackProps) => {
  return (
    <div>
      <div className="d-flex items-center space-x-3">
        <img
          src="/assets/img/profile_avatar.png"
          className="w-[8rem] h-[8rem] rounded-full"
        />
        <span>Emma Jacob</span>
      </div>
      <div className="d-flex items-center space-x-3 text-sm my-3">
        <Rating rating={4.1} className="text-xs text-orange-400" />
        <small className="text-dark">05/09/2022</small>
      </div>
      <p className="text-sm">
        {
          "Love the the product, the delivery got to me at the right time and place without  complaints. Keep it up"
        }
      </p>
    </div>
  );
};
export default function ProfileReviews(props: IProfileReviewsProps) {
  const { provider } = props;
  let { rating = 0 } = provider;
  return (
    <div className="fare-card">
      <div>
        <button className="text-primary-main">Write a review</button>
      </div>
      <hr className="my-4" />
      <div>
        <h1>Ratings and reviews</h1>
        <div className="d-flex space-x-12 px-3">
          <div className="flex-shrink-0">
            <div className="text-[9.6rem] leading-tight font-bold">
              {rating?.toFixed(1)}
            </div>
            <Rating
              rating={rating}
              justify={true}
              className="text-orange-400"
            />
            <span>(234)</span>
          </div>
          <div className="flex-grow-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div className="d-flex items-center space-x-8 my-2" key={rating}>
                <span className="font-medium">{rating}</span>
                <div className="progress flex-grow-1 rounded-full">
                  <div
                    className="progress-bar bg-orange-400"
                    role="progressbar"
                    style={{ width: `${20 * rating}%` }}
                    aria-valuenow={20 * rating}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div>
        <UserFeedback />
      </div>
      <hr className="my-4" />
      <div className="d-flex justify-between items-center">
        <span>1 of 80</span>
        <button className="fare-btn fare-btn-default">View all</button>
      </div>
    </div>
  );
}
