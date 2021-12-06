const Rating = (props) => {
    return (
      <div className="stars-rating ">
        <div className="star-rating-area d-flex align-items-center justify-content-center">
          <div
            className="rating-static clearfix mr-3"
            rel={props?.rating}
          >
            <label
              className="full"
              title="{{ 'Awesome - 5 stars' | translate }}"
            ></label>
            <label
              className="half"
              title="{{ 'Excellent - 4.5 stars' | translate }}"
            ></label>
            <label
              className="full"
              title="{{ 'Excellent - 4 stars' | translate }}"
            ></label>
            <label
              className="half"
              title="{{ 'Better - 3.5 stars' | translate }}"
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
            ></label>
          </div>
          {/* <div className="ratilike ng-binding">5</div> */}
        </div>
      </div>
    );
}
export default Rating;