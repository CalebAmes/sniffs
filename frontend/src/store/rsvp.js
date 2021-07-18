import { csrfFetch } from './csrf';

const SET_RSVP = 'rsvp/setRsvp';
const ADD_RSVP = 'comment/addRsvp';

const setRsvp = (rsvp) => ({
  type: SET_RSVP,
  payload: rsvp,
})

const addRsvp = (rsvp) => ({
  type: ADD_RSVP,
  payload: rsvp,
})

const deleteRsvp = (id) => ({
  type: 'DELETE_RSVP',
  payload: id,
})

export const getRsvp = () => async (dispatch) => {
  const res = await fetch('/api/rsvp');
  const data = await res.json();
  dispatch(setRsvp(data.rsvp));
  return res;
}

export const createRsvp = (rsvp) => async (dispatch) => {
  const { id, userId, eventId } = rsvp;
  const res = await csrfFetch('/api/rsvp', {
    method: 'POST',
    body: JSON.stringify({
      id, userId, eventId
    }),
  });
  const data = await res.json();
  dispatch(addRsvp(data.rsvp));
  return res;
}

export const removeRsvp = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/rsvp/${id}/delete`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id
    })
  });
  const data = await res.json();
  await dispatch(deleteRsvp(id));
  return res;
}

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_RSVP:
      newState = { ...state };
      newState[action.payload] = action.payload;
      return newState;
    case SET_RSVP:
      newState = {};
      action.payload.forEach(item => {
        newState[item.id] = item;
      });
      return newState;
    case 'DELETE_RSVP':
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}

export default reducer