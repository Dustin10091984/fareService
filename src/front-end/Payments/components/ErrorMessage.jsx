import { Fragment } from "react";

const ErrorMessage = ({ stripeErr, serviceRequest }) => {
    return (
        <>
            {stripeErr && (
                <div
                    className="col-12  alert alert-danger text-center"
                    role="alert"
                    style={{ fontSize: 15 }}
                >
                    please enter valid card details
                </div>
            )}
            {(() => {
                if (
                    serviceRequest.error == true &&
                    serviceRequest.loading == false
                ) {
                    switch (typeof serviceRequest.message) {
                        case "string":
                            return (
                                <div
                                    className="col-12  alert alert-danger text-center"
                                    role="alert"
                                    style={{
                                        fontSize: 15,
                                    }}
                                >
                                    {serviceRequest.message}
                                </div>
                            );
                        case "array":
                            const errorMsg = Object.values(
                                serviceRequest.message
                            );
                            return (
                                <div
                                    className="col-12  alert alert-danger text-center"
                                    role="alert"
                                    style={{
                                        fontSize: 15,
                                    }}
                                >
                                    {errorMsg.map((msg, index) => (
                                        <Fragment key={index}>
                                            {msg}
                                            <br />
                                        </Fragment>
                                    ))}
                                </div>
                            );
                    }
                }
            })()}
        </>
    );
};

export { ErrorMessage };
