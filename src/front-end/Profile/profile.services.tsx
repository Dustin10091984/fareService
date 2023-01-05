import * as React from "react";

export interface IProfileServicesProps {
  provider: IProvider;
  className?: string;
  onSelect?: (service: IProviderService) => void;
}

export default function ProfileServices(props: IProfileServicesProps) {
  const { provider, className = "", onSelect } = props;
  return (
    <div className={`fare-card ${className}`}>
      <h1>Services</h1>
      <hr />

      <ul className="profile-links-left">
        {provider?.provider_services?.map((service, index) => {
          return (
            <li
              className="item"
              key={index}
              onClick={() => {
                onSelect && onSelect(service);
              }}
            >
              <div className="link">
                <i className="fa fa-angle-right pr-2" aria-hidden="true"></i>{" "}
                {service?.sub_service?.name}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
