import { memo, useEffect } from "react";
import { ReactSelect } from "../../../components/ReactSelect/ReactSelect";
import PropTypes from "prop-types";

const ServiceArea = ({
    countriesData,
    cityCountry,
    handleCountryCityChange,
}) => {
    const countries = countriesData?.map((item) => ({
        value: item.id,
        label: item.name,
    }));
    const country = countriesData?.find(
        (item) => item.id == cityCountry?.country
    );
    const cities = country?.cities?.map((item) => ({
        value: item.id,
        label: item.name,
    }));
    const city = country?.cities?.find((item) => item.id == cityCountry?.city);
    return (
        <>
            <div className="common-input my-2 pr-2">
                <ReactSelect
                    value={
                        country
                            ? {
                                  value: country?.id,
                                  label: country?.name,
                              }
                            : null
                    }
                    options={countries}
                    onChange={({ value }) =>
                        handleCountryCityChange({ name: "country", value })
                    }
                    placeholder="Please Select Country"
                    maxMenuHeight={200}
                />
            </div>
            <div className="common-input my-2 pl-2">
                <ReactSelect
                    isDisabled={!country}
                    value={city ? { value: city?.id, label: city?.name } : null}
                    options={cities}
                    onChange={({ value }) =>
                        handleCountryCityChange({
                            name: "city",
                            value,
                        })
                    }
                    placeholder="Please Select City"
                    maxMenuHeight={200}
                />
            </div>
        </>
    );
};

ServiceArea.propTypes = {
    countriesData: PropTypes.arrayOf(PropTypes.object),
    cityCountry: PropTypes.object,
    handleCountryCityChange: PropTypes.func,
};

export { ServiceArea };
