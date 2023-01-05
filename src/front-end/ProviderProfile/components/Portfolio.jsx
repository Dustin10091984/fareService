import { Fragment } from "react";

const Portfolio = ({ portfolios, HOST }) => {
    if (portfolios?.length)
        return (
            <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
            >
                <ol className="carousel-indicators">
                    {portfolios?.map((img, index) => (
                        <Fragment key={index}>
                            <li
                                index={index}
                                data-target="#carouselExampleIndicators"
                                data-slide-to={index}
                                className={index == 0 ? "active" : ""}
                            />
                        </Fragment>
                    ))}
                </ol>
                <div className="carousel-inner">
                    {portfolios?.map((data, index) => (
                        <div
                            className={`carousel-item${
                                index == 0 ? " active" : ""
                            }`}
                            key={index}
                        >
                            <img
                                src={(data?.image && HOST + data?.image) || ""}
                                className="d-block w-100"
                                alt="..."
                                style={{
                                    borderRadius: ".5rem",
                                    border: "1px solid #e6e6e6",
                                }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "/assets/img/Placeholder_view.svg";
                                }}
                            />
                            <div className="carousel-caption job-provider-slider-text">
                                <p>{data?.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-target="#carouselExampleIndicators"
                    data-slide="prev"
                    style={{
                        background: "transparent",
                        border: "none",
                    }}
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-target="#carouselExampleIndicators"
                    data-slide="next"
                    style={{
                        background: "transparent",
                        border: "none",
                    }}
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                </button>
            </div>
        );
    else
        return (
            <center
                className="col-12 alert alert-warnig"
                role="alert"
                style={{ fontSize: 20 }}
            >
                Not have Portfolio
            </center>
        );
};

export { Portfolio };
