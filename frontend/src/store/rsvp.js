import { csrfFetch } from "./csrf";

const SET_RSVP = 'event/setRSVP';
const ADD_RSVP = 'event/addRSVP';

const setRSVP = (rsvp) => ({
  type: SET_RSVP,
  rsvp,
})

const addRSVP = (rsvp) => ({
  type: ADD_RSVP,
  rsvp,
})

export const getRSVP = () => async (dispatch) => {
  const res = await fetch('/api/rsvp');
  const data = await res.json();
  dispatch(setRSVP(data.rsvp))
  return res;
}

export const createRSVP = (rsvp) => async (dispatch) => {
  const { userId, eventId } = rsvp;
  const res = await csrfFetch('/api/rsvp', 
  {
    method: 'POST',
    body: JSON.stringify({
      userId,
      eventId,
    })
  });
  const data = await res.json();
  dispatch(addRSVP(data.rsvp));
  return res;
}

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_RSVP:
      newState = { ...state };
      newState[action.rsvp.id] = action.rsvp;
      return newState;
    case SET_RSVP:
      newState = {};
      action.rsvp.forEach(item => {
        newState[item.id] = item;
      });
      return newState;
    default:
      return state;
  }
}

export default reducer;