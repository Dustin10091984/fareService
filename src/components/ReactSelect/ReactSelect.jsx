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
    console.log("====================================");
    console.log(value);
    console.log("====================================");
    return (
        <Select
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
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    maxMenuHeight: PropTypes.number,
};

export { ReactSelect };
