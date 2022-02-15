import { Link } from "react-router-dom";
import moment from "moment";
import Paginate from "./../../components/Paginate";

const OrderHistory = ({ title, list, pagination, data }) => {
    return (
        <div
            className="dashborad-box order-history"
            // style={{
            //     backgroundImage: `url("/assets/img/layer-2.jpg")`,
            // }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="page-title">{title}</div>
                    </div>
                    {list?.map((order, index) => {
                        return (
                            <div className="col-md-6" key={index}>
                                <div className="order-card d-flex align-items-center justify-content-between">
                                    <div className="order-des-b">
                                        <div className="title">
                                            {order?.food?.name ||
                                                order?.product?.name}
                                        </div>
                                        <div className="sub-title">
                                            {order?.restaurant?.name ||
                                                order?.grocery_store?.name}
                                        </div>
                                        <div className="order-time">
                                            {moment().format(
                                                "ddd, MMMM Do YYYY, h:mm:ss a"
                                            )}
                                        </div>
                                    </div>
                                    <div className="order-btn-b">
                                        <Link
                                            to={`/order-detail/${order.id}`}
                                            className="btn-view"
                                        >
                                            View
                                        </Link>
                                        <div className="btn-price">
                                            {`$${order?.price}`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div
                        className="col-md-12"
                        style={{
                            backgroundColor: "#fff",
                            padding: "4rem",
                            borderRadius: "1.5rem",
                            margin: "2rem",
                            marginLeft: "0rem",
                        }}
                    >
                        {pagination && (
                            <Paginate
                                last_page={pagination.last_page}
                                current_page={pagination.current_page}
                                func={data?.func}
                                params={{ type: data?.type }}
                            ></Paginate>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrderHistory;
