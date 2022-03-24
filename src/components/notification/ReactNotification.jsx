import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { handleServiceRequestNotification } from "../../store/Slices/services/RequestServiceSclice";
import { useDispatch } from "react-redux";

const ReactNotificationComponent = ({
    fcmMessageId,
    data,
    // handleMessageClick,
    ...rest
}) => {
    const history = useHistory();

    const dispatch = useDispatch();
    useEffect(() => {
        if(fcmMessageId){
            toast.info(<Display />, {
                hideProgressBar: true,
                newestOnTop: false,
                closeOnClick: false,
                rtl: false,
                pauseOnFocusLoss: false,
                draggable: true,
                pauseOnHover: false,
                position: "top-right",
                toastId: fcmMessageId,
            });
            handlePayload();
        }
    }, [fcmMessageId]);

    const handlePayload = () => {
        if(data?.type == "MOVING" || data?.type == "SERVICE_REQUEST"){
            dispatch(handleServiceRequestNotification(data?.payload))
        }
    }

    const handleNotificationClick = (type) => {
        toast.dismiss(fcmMessageId);
        if (type == "MOVING" || type == "SERVICE_REQUEST") {
            if (data?.service_request_id) {
                history?.push(`/service-detail/${data?.service_request_id}`);
                return;
            }
            history?.push({
                pathname: "/services-history",
            });
        } else if(data?.type == "MESSAGE"){
            // handleMessageClick({
            //     title,
            //     body,
            //     type,
            //     service_request_id,
            //     ...rest
            // });
        }
    };
    
    function Display() {
        var zippi = new Audio('/assets/audio/notification.mp3');
        zippi.play();
        return (
            <div onClick={()=>handleNotificationClick(data?.type)}>
                <h4>{data?.title}</h4>
                <p>{data?.body}</p>
            </div>
        );
    }

    return <></>;
};

// ReactNotificationComponent.defaultProps = {
//     title: "This is title",
//     body: "Some body",
// };

// ReactNotificationComponent.propTypes = {
//     title: PropTypes.string,
//     body: PropTypes.string,
// };

export default ReactNotificationComponent;
