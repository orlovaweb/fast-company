import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;
    const handleChange = (value) => {
        onChange({ name: name, value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                className="basic-multi-select"
                defaultValue={defaultValue}
                classNamePrefix="select"
                onChange={handleChange}
                options={optionsArray}
                name={name}
                closeMenuOnSelect={false}
            />
        </div>
    );
};
MultiSelectField.propTypes = {
    options: PropTypes.object,
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};
export default MultiSelectField;
