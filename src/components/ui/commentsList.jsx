import PropTypes from "prop-types";
import React from "react";
import Comment from "./comment";

const CommentsList = ({ comments, onDelete }) => {
    return (
        <>
            {comments.map((item) => (
                <Comment
                    key={item._id}
                    userId={item.userId}
                    publishedTime={item.created_at}
                    commentContent={item.content}
                    commentId={item._id}
                    onDelete={onDelete}
                />
            ))}
        </>
    );
};
CommentsList.propTypes = {
    comments: PropTypes.array,
    onDelete: PropTypes.func
};
export default CommentsList;
