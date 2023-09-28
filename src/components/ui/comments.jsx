import _ from "lodash";
// import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import CommentForm from "./commentForm";
import CommentsList from "./commentsList";

const Comments = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const comments = useSelector(getComments());
    const isLoading = useSelector(getCommentsLoadingStatus());
    const handleDelete = (commentId) => {
        dispatch(removeComment(commentId));
    };
    const handleSubmit = (data) => {
        dispatch(createComment({ ...data, pageId: userId }));
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
