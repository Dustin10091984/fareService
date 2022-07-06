import Select from "react-select";
import PropTypes from "prop-types";
const ReactSelect = ({
    isDisabled,
    isMulti,
    value,
    options,
    onChange,
    placeholder,
    maxMenuHeight,
}) => {
    const colourStyles = {
        control: (styles) => {
            console.log(styles);
            return {
                ...styles,
                backgroundColor: "#F1F2F6",
                borderColor: "#F1F2F6",
                boxShadow: "none",
                "&:hover": {
                    borderColor: "#FABC66",
                },
                borderRadius: ".5rem",
            };
        },
    };
    return (
        <Select
            styles={colourStyles}
            isDisabled={isDisabled}
            isMulti={isMulti}
            value={value}
            options={options}
            onChange={onChange}
            placeholder={placeholder}
            maxMenuHeight={maxMenuHeight}
        />
    );
};
ReactSelect.displayName = "ReactSelect";

ReactSelect.defaultProps = {
    isDisabled: false,
    isMulti: false,
    value: null,
    options: [],
    onChange: () => {},
    placeholder: "Please Select an Option",
    maxMenuHeight: 200,
};

ReactSelect.propTypes = {
    isDisabled: PropTypes.bool,
    isMulti: PropTypes.bool,
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
