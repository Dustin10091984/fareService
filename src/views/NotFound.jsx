import React from "react";

const NotFound = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <picture>
                        <source srcSet="/assets/img/notfound.jpg" />
                        <img
                            src="/assets/img/notfound.jpg"
                            className="w-100 img-fluid"
                            alt="404"
                        ></img>
                        <span className="not-found">Not Found</span>
                    </picture>
                </div>
            </div>
        </div>
    );
};

export { NotFound };
