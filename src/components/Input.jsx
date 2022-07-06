import PropTypes from "prop-types";

const Input = ({
    type,
    name,
    value,
    placeholder,
    required,
    classNames,
    onChange,
    disabled,
}) => {
    return (
        <div className={classNames}>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={({ target: { name, value } }) => {
                    onChange({ name, value });
                }}
                disabled={disabled}
            />
        </div>
    );
};

Input.defaultProps = {
    type: "text",
    name: "",
    value: "",
    placeholder: "",
    required: false,
    classNames: "",
    onChange: () => {},
    disabled: false,
};

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    classNames: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
};

export { Input };
