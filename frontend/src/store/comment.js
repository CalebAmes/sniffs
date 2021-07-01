import { csrfFetch } from './csrf';

const SET_COMMENT = 'comment/setComment';
const ADD_COMMENT = 'comment/addComment';
const DELETE_COMMENT = 'comment/deleteComment';

const setComment = (comment) => ({
  type: SET_COMMENT,
  payload: comment,
})

const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
})

const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  payload: id,
})

export const getComment = () => async (dispatch) => {
  const res = await fetch('/api/comment');
  const data = await res.json();
  dispatch(setComment(data.comment));
  return res;
}

export const createComment = (comment) => async (dispatch) => {
  const { userId, content, eventId } = comment;
  const res = await csrfFetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({
      userId, content, eventId
    }),
  });
  const data = await res.json();
  dispatch(addComment(data.comment));
  return res;
}

export const deleteComment = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/comment/${id}/delete`, {
    meth
  })
}

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_COMMENT:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case SET_COMMENT:
      newState = {};
      action.payload.forEach(item => {
        newState[item.id] = item;
      });
      return newState;
    default:
      return state;
  }
}

export default reducer