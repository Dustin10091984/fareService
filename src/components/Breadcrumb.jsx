import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const Breadcrumb = ({ data }) => {
    return (
        data?.length > 0 && (
            <div className="breadcrumb-dash">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    {data.map((item, index) => {
                                        if (item?.to) {
                                            return (
                                                <li
                                                    key={index}
                                                    className="breadcrumb-item"
                                                >
                                                    <Link to={item.to}>
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            );
                                        }
                                        if (item?.title && !item?.to) {
                                            return (
                                                <li
                                                    key={index}
                                                    className="breadcrumb-item active"
                                                >
                                                    {item.title}
                                                </li>
                                            );
                                        }
                                    })}
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
export default Breadcrumb;
