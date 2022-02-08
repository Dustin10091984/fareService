import React, { useEffect } from "react";

import Services from "./../front-end/Services";

const ServicesPage = (props) => {
    useEffect(() => {
        document.title = "Farenow: Serivces";
    });
    return <Services {...props} />;
};

export { ServicesPage };
