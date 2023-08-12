import PropTypes from "prop-types";
import React from "react";

const TextAreaField = ({ name, label, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                value={value}
                rows="3"
                onChange={handleChange}
                className={error ? "form-control is-invalid" : "form-control"}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};
TextAreaField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};
export default TextAreaField;
