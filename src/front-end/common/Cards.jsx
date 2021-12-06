import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Rating from "../../components/Rating";

const Card = (props) => {
  return (
    <>
      <div>
        <Link
          to={{
            pathname: `/restaurants/${props.id}`,
          }}
          className="product-card d-flex justify-content-center flex-column"
        >
          <div className="prod-img mx-auto">
            <img className="col-12" src="/assets/img/product.png" alt="" />
          </div>
          <div className="prod-detail">
            <div className="title">
              {props?.name}
            </div>
            <div className="sub-title">{props?.restaurant_type}</div>
            {/* <div className="price">$100.0</div> */}
            <Rating rating={props?.user?.rating}/>
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
  )
}

export const Restaurant = (restaurant) => {
    return (
      <Card restaurant {...restaurant}/>
    );
}

export const Food = (food) => {
  return (
    <Card food {...food} />
  );
}