import React, { useState, useEffect } from "react";
import { getToken } from "../../firebaseInit.js";

const Notifications = (props) => {
    const [isTokenFound, setTokenFound] = useState(false);

    // To load once
    const userData = JSON.parse(localStorage.getItem("user_data"));
    useEffect(() => {
        if (!userData?.device_token && isTokenFound === false) {
            let data;
            async function tokenFunc() {
                data = await getToken(setTokenFound);
                if (data) {
                    console.log("Token is", data);
                }
                return data;
            }
            tokenFunc();
        } else {
            setTokenFound(true);
        }
    }, [setTokenFound]);

    return <></>;
};

Notifications.propTypes = {};

export default Notifications;
