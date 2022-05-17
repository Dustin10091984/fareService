import React, { useState, useEffect } from "react";

import Registration from "./../../front-end/ProviderRegistration/index.js";

const RegistrationPage = (props) => {
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        document.title = "Farenow: Provider Registration From";
    });
    return <Registration {...props} />;
};

export { RegistrationPage };
