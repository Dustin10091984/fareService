import React, { useState, useEffect } from "react";

import Registration from "./../../front-end/ProviderRegistration";

const RegistrationPage = (props) => {
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        document.title = "Farenow: Provider Registration From";
    });
    return <Registration />;
};

export { RegistrationPage };
