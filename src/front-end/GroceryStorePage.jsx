import Rating from "./../components/Rating";
import { FoodCard } from "./common/Cards";
import { Cart } from "./common/Cart";
export const GroceryStorePage = (props) => {
    return (
        <div className="container-fluid restaurant-page">
            <div className="row">
                <div
                    className="col-md-9 "
                    style={{
                        paddingRight: "0px",
                    }}
                >
                    <div className="row">
                        <div className="col-md-12">
                            <img
                                src={"assets/img/restaurant.jpg"}
                                className="restaurant-banner"
                            ></img>
                            <div className="col-md-12">
                                <div className="row d-flex align-items-center">
                                    <div className="col-md-8  restaurant-name">
                                        Ne'mat Khana
                                    </div>
                                    <div className="col-md-4 restaurant-rating d-flex justify-content-end">
                                        <Rating rating={3}></Rating>
                                    </div>
                                    <div className="col-md-12 restaurant-address">
                                        Mughal Pura Lahore, Pakistan
                                    </div>
                                    <div className="col-md-12 restaurant-category">
                                        Lorem ipsum dolor sit amet, consectetur
                                    </div>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="row mt-4">
                                        <FoodCard />
                                        <FoodCard />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <Cart></Cart>
                </div>
            </div>
        </div>
    );
};
