import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import commentService from "../services/comments.service";
import { useAuth } from "./useAuth";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const { userId } = useParams();
    const { currentUser } = useAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        getComments();
    }, [userId]);
    useEffect(() => {
        if (error != null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    async function createComment(data) {
        const comment = {
            content: data.commentText,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id,
            _id: nanoid()
        };
        try {
            const { content } = await commentService.createComment(comment);
            setComments((prevState) => [...prevState, content]);
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId);
            // console.log(content);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }
    async function removeComment(id) {
        try {
            const { content } = await commentService.removeComment(id);
            if (content === null) {
                setComments((prevState) =>
                    prevState.filter((c) => c._id !== id)
                );
            }
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        // setLoading(false);
    }

    return (
        <CommentsContext.Provider
            value={{ comments, createComment, isLoading, removeComment }}
        >
            {children}
        </CommentsContext.Provider>
    );
};
CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
