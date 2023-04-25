import React from "react";
import PropTypes from "prop-types";
const SearchStatus = ({ length }) => {
    const renderPharse = (number) => {
        if (number <= 4 && number > 1) return "человека тусанут";
        return "человек тусанет";
    };

    return (
        <h2>
            <span
                className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}
            >
                {length > 0
                    ? `${length} ${renderPharse(length)} с тобой сегодня`
                    : "Никто с тобой не тусанет"}
            </span>
        </h2>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};
export default SearchStatus;
