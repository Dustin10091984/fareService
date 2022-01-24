import React, { useState, useEffect } from "react";

import ProviderRegistration from "./../../front-end/ProviderRegistration";

const Registration = (props) => {
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        document.title = "Farenow: Provider Registration From";
    });
    return <ProviderRegistration />;
};

export { Registration };
