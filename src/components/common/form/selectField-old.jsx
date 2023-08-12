import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    value,
    onChange,
    options,
    label,
    defaultOption,
    error,
    name
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={error ? "form-select is-invalid" : "form-control"}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
SelectField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    defaultOption: PropTypes.string,
    error: PropTypes.string,
    name: PropTypes.string
};
export default SelectField;
