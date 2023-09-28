import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comments.service";
import { getCurrentUserId } from "./users";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestField: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsReceved, commentsRequestField, commentCreated, commentRemoved } = actions;

const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentRemoveRequested = createAction("comments/commentRemoveRequested");

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceved(content));
  } catch (error) {
    dispatch(commentsRequestField(error.message));
  }
};

export function createComment(payload) {
  return async function (dispatch, getState) {
    dispatch(commentCreateRequested(payload));
    const comment = {
      ...payload,
      content: payload.commentText,
      created_at: Date.now(),
      userId: getCurrentUserId()(getState()),
      _id: nanoid()
    };
    console.log(comment);
    try {
      const { content } = await commentService.createComment(comment);
      dispatch(commentCreated(content));
    } catch (error) {
      dispatch(commentsRequestField(error.message));
    }
  };
}
export function removeComment(payload) {
  return async function (dispatch) {
    dispatch(commentRemoveRequested());
    try {
      const { content } = await commentService.removeComment(payload);
      if (content === null) {
        dispatch(commentRemoved(payload));
      }
    } catch (error) {
      dispatch(commentsRequestField(error.message));
    }
  };
}

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
