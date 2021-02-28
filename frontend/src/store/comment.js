const SET_COMMENT = 'comment/setComment';
const ADD_COMMENT = 'comment/addComment';

const setComment = (comment) => ({
  type: SET_COMMENT,
  payload: comment,
})

const setComment = (comment) => ({
  type: SET_COMMENT,
  payload: comment,
})

export const getComment = () => async (dispatch) => {
  const res = await fetch('/api/comment');
  const data = await res.json();
  dispatch(setComment(data.comment));
  return res;
}

export const createComment = (event) => async (dispatch) => {
  const { userId, content, eventId } = comment;
  const res = await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({
      userId, content, eventId,
    }),
  });
  const date = await res.json();
  dispatch(addComment(data.comment));
  return res;
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