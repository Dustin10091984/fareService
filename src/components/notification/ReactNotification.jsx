import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReactNotificationComponent = ({ title, body }) => {
    if (title !== "" && !body !== "") {
        toast.info(<Display />, {
            hideProgressBar: true,
            newestOnTop: false,
            closeOnClick: false,
            rtl: false,
            pauseOnFocusLoss: false,
            draggable: true,
            pauseOnHover: false,
            position: "top-right",
        });
    }

    function Display() {
        return (
            <div>
                <h4>{title}</h4>
                <p>{body}</p>
            </div>
        );
    }

    return <></>;
};

ReactNotificationComponent.defaultProps = {
    title: "This is title",
    body: "Some body",
};

ReactNotificationComponent.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
};

export default ReactNotificationComponent;
