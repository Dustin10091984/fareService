import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const ReactNotificationComponent = ({
    title,
    body,
    type,
    service_request_id,
}) => {
    const location = useLocation();
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

    const handleNotificationClick = (type) => {
        toast.dismiss();
        if (type == "MOVING" || type == "SERVICE_REQUEST") {
            if (service_request_id) {
                location.push(`/service-detail/${service_request_id}`);
                return;
            }
            location.push({
                pathname: "/services-history",
            });
        }
    };
    
    function Display() {
        var zippi = new Audio('/assets/audio/notification.mp3')
        zippi.play();
        return (
            <div onClick={type && handleNotificationClick(type)}>
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
