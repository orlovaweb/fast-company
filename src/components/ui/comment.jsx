import PropTypes from "prop-types";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUsers";
import displayDate from "../../utils/displayDate";

const Comment = ({
    userId,
    publishedTime,
    commentContent,
    commentId,
    onDelete
}) => {
    const { getUserById } = useUser();
    const user = getUserById(userId);
    const { currentUser } = useAuth();

    return (
        <>
            <div className="bg-light card-body  mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={user.image}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {user.name}
                                            <span className="small">
                                                {"  "}-{"  "}
                                                {displayDate(publishedTime)}
                                            </span>
                                        </p>
                                        {currentUser._id === userId && (
                                            <button
                                                className="btn btn-sm text-primary d-flex align-items-center"
                                                onClick={() =>
                                                    onDelete(commentId)
                                                }
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        )}
                                    </div>
                                    <p className="small mb-0">
                                        {commentContent}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
Comment.propTypes = {
    userId: PropTypes.string,
    publishedTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    commentContent: PropTypes.string,
    commentId: PropTypes.string,
    onDelete: PropTypes.func
};
export default Comment;
