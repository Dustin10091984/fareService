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
            return {
                ...styles,
                backgroundColor: "#F1F2F6",
                borderColor: "#F1F2F6",
                boxShadow: "none",
                "&:hover": {
                    borderColor: "#FABC66",
                },
                borderRadius: "1rem",
                height: "1.7rem",
            };
        },
        valueContainer: (styles) => {
            return {
                ...styles,
                padding: "0rem 1rem",
            };
        },
        input: (styles) => {
            console.log(styles);
            return {
                ...styles,
                padding: "0rem 1rem",
                color: "#606060",
            };
        },
        placeholder: (styles) => {
            return {
                ...styles,
                color: "#606060",
                fontSize: '1.39rem'
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
