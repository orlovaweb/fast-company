import React from "react";
import PropTypes from "prop-types";

const SearchItemsForm = ({ value, onChange }) => {
    return (
        <div>
            <form>
                <div className="input-group mb-3">
                    <span className="input-group-text">
                        <i className="bi bi-search"></i>
                    </span>
                    <input
                        className="form-control"
                        type="text"
                        id="search"
                        name="search"
                        value={value}
                        onChange={onChange}
                        placeholder="Search..."
                    />
                </div>
            </form>
        </div>
    );
};
SearchItemsForm.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};
export default SearchItemsForm;
