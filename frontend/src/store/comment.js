import { csrfFetch } from "./csrf";
import {
  addEventComment,
  updateEventComment,
  removeEventComment,
} from "./event";

const SET_COMMENT = "comment/setComment";
const ADD_COMMENT = "comment/addComment";
const DELETE_COMMENT = "comment/deleteComment";

const setComment = (comment) => ({
  type: SET_COMMENT,
  payload: comment,
});

const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  payload: id,
});

export const getComment = () => async (dispatch) => {
  const res = await fetch("/api/comment/");
  const data = await res.json();
  dispatch(setComment(data.comment));
  return res;
};

export const getUserComments = (userId) => async (dispatch) => {
  const res = await fetch(`/api/comment/user/${userId}/`);
  const data = await res.json();
  dispatch(setComment(data.comment));
  return res;
};

export const createComment = (comment) => async (dispatch) => {
  const { userId, content, eventId } = comment;
  const res = await csrfFetch("/api/comment/", {
    method: "POST",
    body: JSON.stringify({
      userId,
      content,
      eventId,
    }),
  });
  const data = await res.json();
  await dispatch(addEventComment(data.comment));
  // dispatch(addComment(data.comment)); don't need this anymore
  return res;
};

export const updateComment = (comment) => async (dispatch) => {
  const { id, newComment } = comment;
  const res = await csrfFetch(`/api/comment/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      content: newComment,
      id,
    }),
  });
  const data = await res.json();
  await dispatch(updateEventComment(data.comment));
  return res;
};

export const removeComment = (comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comment/${comment.id}/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: comment.id,
    }),
  });
  await dispatch(removeEventComment(comment));
  // await dispatch(deleteComment(id));
  return res;
};

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_COMMENT:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case SET_COMMENT:
      newState = {};
      action.payload.forEach((item) => {
        newState[item.id] = item;
      });
      return newState;
    case DELETE_COMMENT:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}

export default reducer;
