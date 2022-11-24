import * as React from "react";
import Rating from "../../components/Rating";
import { HOST } from "../../constants";
import { padNumber } from "../../helper/utils";
export interface IProfileReviewsProps {
  provider?: IProvider;
  feedbacks: IFeedback[];
}
export interface IUserFeedbackProps {
  feedback?: IFeedback;
}
export const UserFeedback = (props: IUserFeedbackProps) => {
  const { feedback: { user, comment, created_at } = {} } = props;
  return (
    <div>
      <div className="d-flex items-center space-x-3">
        <img
          src={
            user ? `${HOST}/${user.image}` : "/assets/img/profile_avatar.png"
          }
          className="w-[8rem] h-[8rem] rounded-full"
        />
        <span>{user ? `${user.first_name} ${user.last_name}` : "Unnamed"}</span>
      </div>
      <div className="d-flex items-center space-x-3 text-sm my-3">
        <Rating rating={4.1} className="text-xs text-orange-400" />
        <small className="text-dark">
          {new Date(created_at).toLocaleDateString()}
        </small>
      </div>
      <p className="text-sm">{comment}</p>
    </div>
  );
};
export default function ProfileReviews(props: IProfileReviewsProps) {
  const { provider, feedbacks } = props;
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
            <span>({padNumber(feedbacks?.length, 2)})</span>
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
        {feedbacks.map((feedback) => (
          <UserFeedback key={feedback.id} feedback={feedback} />
        ))}
      </div>
      <hr className="my-4" />
      <div className="d-flex justify-between items-center">
        <span>1 of 80</span>
        <button className="fare-btn fare-btn-default">View all</button>
      </div>
    </div>
  );
}
