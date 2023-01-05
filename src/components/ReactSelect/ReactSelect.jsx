import Select, { components } from "react-select";
import { HOST } from "../../constants";
import PropTypes from "prop-types";

const styles = {
    control: (styles) => {
        return {
            ...styles,
            backgroundColor: "#F1F2F6",
            borderColor: "#F1F2F6",
            boxShadow: "none",
            "&:hover": {
                borderColor: "#FABC66",
            },
            borderRadius: "1rem",
            minHeight: "1.7rem",
            width: "100%",
        };
    },
    valueContainer: (styles) => {
        return {
            ...styles,
            padding: "0rem 1rem",
            width: "100%",
        };
    },
    input: (styles) => {
        return {
            ...styles,
            padding: "0rem 1rem",
            color: "#606060",
            width: "100%",
        };
    },
    placeholder: (styles) => {
        return {
            ...styles,
            color: "#606060",
            fontSize: "1.39rem",
        };
    },
    option: (styles, { isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isSelected
                ? "#fea629"
                : isFocused
                ? "#FABC66"
                : "",
            color: isSelected ? "#fff" : isFocused ? "#fff" : "#000",
            "&:active": {
                backgroundColor: "#fea629",
            },
        };
    },
    // singleValue: (styles) => {
    //     return {
    //         ...styles,
    //         color: "#606060",
    //         fontSize: "1.39rem",
    //     };
    // },
    // multiValue: (styles) => {
    //     return {
    //         ...styles,
    //         backgroundColor: "#fea629",
    //         color: "#fff",
    //     };
    // },
};

// const animatedComponents = makeAnimated();

const ReactSelect = ({
    isDisabled = false,
    isMulti = false,
    isSearchable = false,
    isLoading = false,
    name,
    value,
    options,
    onChange,
    placeholder,
    maxMenuHeight = 100,
    withImage = false,
}) => {
    const { Option, Control } = components;
    const CustomOption = (props) => {
        return (
            <>
                <Option {...props}>
                    <img
                        src={
                            props?.data?.image
                                ? `${HOST}${props?.data?.image}`
                                : "/assets/img/vehicle-placeholder.svg"
                        }
                        style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            marginRight: "0.5rem",
                        }}
                    />
                    {props.data?.label}
                </Option>
            </>
        );
    };

    const CustomControl = ({ children, ...props }) => {
        const { getValue, hasValue } = props;
        const value = hasValue && getValue()[0];
        return (
            <Control {...props}>
                {hasValue && (
                    <>
                        <span className="mr-3" />
                        <img
                            src={
                                value.image
                                    ? `${HOST}${value?.image}`
                                    : "/assets/img/vehicle-placeholder.svg"
                            }
                            style={{
                                width: "2.5rem",
                                height: "2.5rem",
                                marginRight: "0.5rem",
                            }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    "/assets/img/vehicle-placeholder.svg";
                            }}
                        />
                    </>
                )}
                {children}
            </Control>
        );
    };

    return (
        <Select
            {...{
                isMulti,
                isLoading,
                isDisabled,
                isSearchable,
                name,
                value,
                styles,
                placeholder,
                maxMenuHeight,
                components: withImage && {
                    Option: CustomOption,
                    Control: CustomControl,
                },
                options,
                onChange,
            }}
        />
    );
};

ReactSelect.displayName = "ReactSelect";

ReactSelect.defaultProps = {
    isDisabled: false,
    isMulti: false,
    isSearchable: true,
    value: undefined,
    options: [],
    onChange: () => {},
    placeholder: "Please Select an Option",
    maxMenuHeight: 200,
};

ReactSelect.propTypes = {
    isDisabled: PropTypes.bool,
    isMulti: PropTypes.bool,
    isSearchable: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object),
    ]),
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    maxMenuHeight: PropTypes.number,
};

export { ReactSelect };
