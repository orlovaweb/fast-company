import _ from "lodash";
// import PropTypes from "prop-types";
import React from "react";
import { useComments } from "../../hooks/useComments";
import CommentForm from "./commentForm";
import CommentsList from "./commentsList";

const Comments = () => {
    const { createComment, comments, isLoading, removeComment } = useComments();

    const handleDelete = (commentId) => {
        removeComment(commentId);
    };
    const handleSubmit = (data) => {
        createComment(data);
    };

    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <CommentForm onSubmit={handleSubmit} />
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {!isLoading && (
                        <CommentsList
                            comments={sortedComments}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
        </>
    );
};
export default Comments;
