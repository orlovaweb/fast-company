import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ user }) => {
    return (
        <button onClick={() => user.onToggleBookMark(user._id)}>
            <i
                className={
                    "bi bi-bookmark" + (user.bookmark ? "-heart-fill" : "")
                }
            ></i>
        </button>
    );
};
BookMark.propTypes = {
    user: PropTypes.object.isRequired
};
export default BookMark;
