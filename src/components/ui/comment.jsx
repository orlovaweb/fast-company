import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import api from "../../api";
import displayDate from "../../utils/displayDate";

const Comment = ({
    userId,
    publishedTime,
    commentContent,
    commentId,
    onDelete
}) => {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then((data) => {
            setUser(data);
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            <div className="bg-light card-body  mb-3">
                <div className="row">
                    {isLoading ? (
                        "Loading..."
                    ) : (
                        <div className="col">
                            <div className="d-flex flex-start ">
                                <img
                                    src={`https://avatars.dicebear.com/api/avataaars/${(
                                        Math.random() + 1
                                    )
                                        .toString(36)
                                        .substring(7)}.svg`}
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
                                            <button
                                                className="btn btn-sm text-primary d-flex align-items-center"
                                                onClick={() =>
                                                    onDelete(commentId)
                                                }
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        </div>
                                        <p className="small mb-0">
                                            {commentContent}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
