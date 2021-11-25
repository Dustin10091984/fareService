import React, { Component } from 'react';
import { Link } from "react-router-dom";
export const Restaurant = (restaurant) => {
    return (
      <>
        <div>
          <Link
            to={{
              pathname: `/restaurants/${restaurant.id}`,
            }}
            className="product-card d-flex justify-content-center flex-column"
          >
            <div className="prod-img mx-auto">
              <img className="col-12" src="/assets/img/product.png" alt="" />
            </div>
            <div className="prod-detail">
              <div className="title">
                {restaurant?.name}
              </div>
              <div className="sub-title">{restaurant?.restaurant_type}</div>
              {/* <div className="price">$100.0</div> */}
              <div className="stars-rating ">
                <div className="star-rating-area d-flex align-items-center justify-content-center">
                  <div className="rating-static clearfix mr-3" rel={restaurant?.user?.rating}>
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
              <div className="text-center">
                <button
                  // to='/food-detail'
                  className="button-common"
                >
                  View Menu
                </button>
                <button className="button-common-2 d-none">Closed</button>
              </div>
            </div>
          </Link>
        </div>
      </>
    );
 
}