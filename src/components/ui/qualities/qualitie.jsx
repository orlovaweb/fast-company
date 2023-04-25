import React from "react";
import PropTypes from "prop-types";
const Quality = ({ name, color }) => {
    return (
        <>
            <li className={"badge m-1 bg-" + color}>{name}</li>
        </>
    );
};
Quality.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};
export default Quality;
