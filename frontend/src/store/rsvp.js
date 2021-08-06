import { csrfFetch } from './csrf';
import { addEventRsvp, removeEventRsvp } from './event'

const SET_RSVP = 'rsvp/setRsvp';
const ADD_RSVP = 'rsvp/addRsvp';
const DELETE_RSVP = 'rsvp/deleteRsvp';
const UPDATE_RSVP = 'rsvp/UPDATE_RSVP';

const setRsvp = (rsvp) => ({
  type: SET_RSVP,
  rsvp,
})

const addRsvp = (rsvp) => ({
  type: ADD_RSVP,
  rsvp,
})

const deleteRsvp = (id) => ({
  type: DELETE_RSVP,
  id,
})

export const updateRsvp = (event) => ({
  type: UPDATE_RSVP,
  event,
})

export const getUserRsvp = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/rsvp/${userId}/events`);
  const data = await res.json()
  await dispatch(setRsvp(data));
  return res;
}

export const createRsvp = (rsvp) => async (dispatch) => {
  const { userId, eventId, } = rsvp;
  const res = await csrfFetch('/api/rsvp', {
    method: 'POST',
    body: JSON.stringify({
      userId, eventId
    }),
  });
  const data = await res.json();
  dispatch(addEventRsvp({eventId, data}));
  dispatch(addRsvp(data));
  return res;
}

export const removeRsvp = (rsvp) => async (dispatch) => {
  const { userId, eventId, } = rsvp;
  const res = await csrfFetch(`/api/rsvp/${eventId}/delete`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      eventId,
      userId,
    })
  });
  dispatch(removeEventRsvp(rsvp));
  await dispatch(deleteRsvp(eventId));
  return res;
}

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_RSVP:
      newState = { ...state };
      newState[action.rsvp.eventId] = action.rsvp;
      return newState;
    case SET_RSVP:
      newState = {};
      action.rsvp.forEach(item => {
        newState[item.eventId] = item;
      });
      return newState;
    case DELETE_RSVP:
      newState = { ...state };
      delete newState[action.id];
      return newState;
    case UPDATE_RSVP:
      newState = { ...state };
      newState[action.event.id] = action.event;
      return newState;
    default:
      return state;
  }
}

export default reducer