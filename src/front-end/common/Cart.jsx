import Rating from "../../components/Rating";
import { CheckOutCard, FoodCard } from "./Cards";

export const Cart = (props) => {
    return (
        <div
            className="container-fluid sticky-top"
            style={{
                border: ".1rem solid #e6e6e6",
                borderRadius: "0.5rem",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                marginBottom: "1rem",
            }}
        >
            <div className="row cart-sec">
                <div
                    className="col-md-12 mb-3"
                    style={{
                        paddingLeft: "0px",
                        paddingRight: "0px",
                    }}
                >
                    <div className="text-center">
                        <h3>Your Order</h3>
                    </div>
                    <div className="text-center mb-5">
                        <h5>Add item to your cart</h5>
                    </div>
                    <div
                        style={{
                            overflow: "auto",
                            width: "100%",
                            height: "80vh",
                            paddingTop: "1rem",
                        }}
                    >
                        <CheckOutCard
                            {...{
                                id: 1,
                                image: "assets/img/shop-home.jpg",
                                title: "Chicken",
                                price: "$10",
                                quantity: "1",
                            }}
                        />
                    </div>
                    <hr className="mt-4" />
                </div>
                <div className="col-8">Subtotal</div>
                <div className="col-4">
                    <span className=" float-right">35374</span>
                </div>
                <div className="col-8">Total</div>
                <div className="col-4">
                    <span className=" float-right">35374</span>
                </div>
                <div className="col-md-12">
                    <button
                        className="btn-block"
                        style={{
                            border: "none",
                            padding: "1.5rem",
                            marginBottom: "1rem",
                            marginTop: "1rem",
                            backgroundColor: "#c5c4c4",
                            color: "white",
                            fontSize: "2rem",
                            fontWeight: "bold",
                        }}
                    >
                        GO TO CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
};
