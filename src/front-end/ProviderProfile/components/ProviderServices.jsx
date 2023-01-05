const ProviderServices = ({ providerServices, HOST }) => {
    return (
        <>
            <div className="title-servic px-2 mb-4">
                {providerServices?.id
                    ? `Service: ${providerServices?.sub_service?.name}`
                    : "Services"}
            </div>
            <hr />
            {providerServices?.id ? (
                <img
                    className="img-fluid"
                    src={
                        providerServices?.sub_service?.image
                            ? HOST + providerServices?.sub_service?.image
                            : `/assets/img/Placeholder_view.svg`
                    }
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `/assets/img/Placeholder_view.svg`;
                    }}
                    alt=""
                />
            ) : (
                <ul className="profile-links-left">
                    {providerServices?.map((service, index) => {
                        return (
                            <li className="item" key={index}>
                                <div className="link">
                                    <i
                                        className="fa fa-angle-right pr-2"
                                        aria-hidden="true"
                                    ></i>{" "}
                                    {service?.sub_service?.name}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};

export default ProviderServices;
