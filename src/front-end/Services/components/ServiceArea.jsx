import { ReactSelect } from "../../../components/ReactSelect/ReactSelect";
import PropTypes from "prop-types";

const ServiceArea = ({
    countriesData,
    cityCountry,
    handleCountryCityOrStateChange,
    extraClasses = "",
}) => {
    const countries = countriesData?.map((item) => ({
        value: item.id,
        label: item.name,
    }));
    const country = countriesData?.find(
        (item) => item.id == cityCountry?.country
    );

    const states = country?.states?.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const state = country?.states?.find((item) => item.id == cityCountry?.state);

    // const cities = country?.cities?.map((item) => ({
    //     value: item.id,
    //     label: item.name,
    // }));
    // const city = country?.cities?.find((item) => item.id == cityCountry?.city);
    return (
        <>
            <div className={`common-input my-2 pr-2 ${extraClasses}`}>
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
                        handleCountryCityOrStateChange({
                            name: "country",
                            value,
                        })
                    }
                    placeholder="Please Select Country"
                    maxMenuHeight={200}
                />
            </div>
            <div className={`common-input my-2 pr-2 ${extraClasses}`}>
                <ReactSelect
                    isDisabled={!country}
                    value={
                        state ? { value: state?.id, label: state?.name } : null
                    }
                    options={states}
                    onChange={({ value }) =>
                        handleCountryCityOrStateChange({
                            name: "state",
                            value,
                        })
                    }
                    placeholder="Please Select State"
                    maxMenuHeight={200}
                />
            </div>
        </>
    );
};

ServiceArea.displayName = "ServiceArea";

ServiceArea.propTypes = {
    countriesData: PropTypes.arrayOf(PropTypes.object).isRequired,
    cityCountry: PropTypes.object,
    handleCountryOrStateCityChange: PropTypes.func.isRequired,
};

export { ServiceArea };
