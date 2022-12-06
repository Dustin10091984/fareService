import React, { memo, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import ServiceType from "../../../constants/ServiceType";
const Filter = memo(({ providerType }) => {
  const location = useLocation();
  const history = useHistory();
  const { pathname, search, state: prevState } = location;
  const searchParams = new URLSearchParams(search);

  const handleFilterClick = ({ type, value, change }) => {
    searchParams.toString();
    if ((searchParams.has(type) && !change) || (change && !!!value)) {
      searchParams.delete(type);
    } else {
      change && searchParams.delete(type);
      searchParams.append(type, value);
    }
    history.replace({
      pathname,
      search: searchParams.toString(),
      state: prevState,
    });
  };

  return (
    <aside className="col-md-4" style={{ zIndex: 0 }}>
      <div className="sticky-top">
        <div className="service-time-box text-gray-500">
          <div className="date-ser mb-3">
            <div className="title-servic p-2 mb-4">Provider Type</div>
            {providerType != ServiceType.MOVING && (
              <div className="time-list-pro">
                <div
                  className={`mx-2 select-time ${
                    searchParams.has("hourly") ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleFilterClick({
                      type: "hourly",
                      value: "true",
                    })
                  }
                >
                  Hourly
                </div>
                <div
                  className={`mx-2 select-time ${
                    searchParams.has("quotation") ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleFilterClick({
                      type: "quotation",
                      value: "true",
                    })
                  }
                >
                  Quotation based
                </div>
              </div>
            )}
          </div>
          <div className="time-list-pro mb-4 mx-2 w-auto ">
            <select
              value={searchParams.get("rating") || ""}
              name="rating"
              className="select-time basis-full outline-none "
              onChange={({ target: { name, value } }) => {
                handleFilterClick({
                  type: name,
                  value,
                  change: true,
                });
              }}
            >
              <option defaultChecked value="">
                By rating
              </option>
              <option value="4">4+ Star</option>
              <option value="3">3+ Star</option>
              <option value="2">2+ Star</option>
              <option value="">Clear</option>
            </select>
          </div>
          <hr />
          <div className="date-ser mt-3">
            <div className="title-servic px-2">Date</div>

            <div className="time-list-pro">
              <div
                className={`mx-2 select-time ${
                  searchParams.has("today") ? "selected" : ""
                }`}
                onClick={() => {
                  handleFilterClick({
                    type: "today",
                    value: "true",
                  });
                }}
              >
                Today
              </div>
              <div
                className={`mx-2 select-time ${
                  searchParams.has("week") ? "selected" : ""
                }`}
                onClick={() => {
                  handleFilterClick({
                    type: "week",
                    value: "true",
                  });
                }}
              >
                This week
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
});

export { Filter };
