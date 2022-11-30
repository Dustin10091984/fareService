import React, { useState } from "react";
import Empty from "../../components/Empty";
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
            user ? `${HOST}/${user.image}` : "/assets/img/Profile_avatar.png"
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
  let { provider, feedbacks = [] } = props;
  let { rating = 0 } = provider;

  const [viewAll, setViewAll] = useState(false);

  return (
    <div className="fare-card">
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
        {feedbacks.slice(0, viewAll ? undefined : 1).map((feedback) => (
          <React.Fragment key={feedback.id}>
            <UserFeedback key={feedback.id} feedback={feedback} />
            <hr className="mt-3 mb-4" />
          </React.Fragment>
        ))}
        {!feedbacks?.length && (
          <div className="h-[15rem] d-flex items-center justify-center">
            <Empty
              text="No feedbacks"
              icon="commenting"
              className="text-gray-400"
            />
          </div>
        )}
      </div>
      <div className="d-flex justify-between items-center">
        <span>
          {viewAll ? feedbacks.length : 1} of {feedbacks.length}
        </span>
        <button
          className="fare-btn fare-btn-default"
          onClick={() => {
            setViewAll(!viewAll);
          }}
          disabled={!feedbacks.length}
        >
          {viewAll ? "Close" : "View all"}
        </button>
      </div>
    </div>
  );
}
