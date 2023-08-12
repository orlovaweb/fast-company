import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import api from "../../api";
import CommentForm from "./commentForm";
import CommentsList from "./commentsList";
// import { useParams } from "react-router-dom"

const Comments = ({ pageId }) => {
    const [comments, setComments] = useState();
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(pageId)
            .then((data) => setComments(data));
    }, []);

    const handleDelete = (commentId) => {
        setComments((prevState) =>
            prevState.filter((comment) => comment._id !== commentId)
        );
        api.comments.remove(commentId).then((data) => {
            console.log("data ", data);
        });
    };
    const handleSubmit = (userId, content) => {
        api.comments.add({ userId, pageId, content }).then((data) => {
            setComments([...comments, data]);
        });
    };

    if (comments) {
        const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);
        return (
            <>
                <CommentForm onSubmit={handleSubmit} />
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            </>
        );
    }
    return null;
};
Comments.propTypes = {
    pageId: PropTypes.string
};
export default Comments;
