import { csrfFetch } from "./csrf";

const SET_RSVP = 'rsvp/setRSVP';
const ADD_RSVP = 'rsvp/addRSVP';

const setRSVP = (rsvp) => ({
  type: SET_RSVP,
  payload: rsvp,
})

const addRSVP = (rsvp) => ({
  type: ADD_RSVP,
  payload: rsvp,
})

export const getRSVP = () => async (dispatch) => {
  const res = await fetch('/api/rsvp');
  const data = await res.json();
  dispatch(setRSVP(data.rsvp))
  return res;
}

export const createRSVP = (rsvp) => async (dispatch) => {
  const { userId, eventId } = rsvp;
  const response = await csrfFetch('/api/rsvp', 
  {
    method: 'POST',
    body: JSON.stringify({
      userId,
      eventId
    })
  });
  const data = await response.json();
  dispatch(addRSVP(data.rsvp));
  return response;
}

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_RSVP:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case SET_RSVP:
      newState = {};
      action.payload.forEach(item => {
        newState[item.id] = item;
      });
      return newState;
    default:
      return state;
  }
}

export default reducer;