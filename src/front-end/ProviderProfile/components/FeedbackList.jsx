import Rating from "../../../components/Rating";

const FeedbackList = ({ feedbacks, HOST }) => {
    if (feedbacks)
        return (
            <>
                {feedbacks.map(
                    (feedback, index) =>
                        feedback.user && (
                            <div key={index} className="top-reviews-list">
                                <div className="revie-card">
                                    <div className="d-flex align-itmes-center justify-content-between">
                                        <div className="title">{`${feedback?.user?.first_name} ${feedback?.user?.last_name[0]}.`}</div>
                                        <Rating rating={feedback?.rating} />
                                    </div>

                                    <div className="review-item d-flex align-itmes-centetr justifu-content-between">
                                        <div className="review-img">
                                            <img
                                                src={
                                                    (feedback?.user?.image &&
                                                        `${HOST}${feedback?.user?.image}`) ||
                                                    ""
                                                }
                                                className="img-fluid"
                                                alt=""
                                                onError={(e) => {
                                                    e.target.src =
                                                        "/assets/img/Profile_avatar.png";
                                                }}
                                            />
                                        </div>
                                        {!!feedback?.comment && (
                                            <div className="review-detail">
                                                {feedback?.comment}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                )}
            </>
        );
    else
        return (
            <center
                className="col-12 alert alert-warnig"
                role="alert"
                style={{ fontSize: 20 }}
            >
                Not have reviews
            </center>
        );
};

export { FeedbackList };
