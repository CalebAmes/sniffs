import { csrfFetch } from './csrf';

const SET_RSVP = 'rsvp/setRsvp';
const ADD_RSVP = 'comment/addRsvp';

const setRsvp = (rsvp) => ({
  type: SET_RSVP,
  payload: rsvp
})

const addRsvp = (rsvp) => ({
  type: ADD_RSVP,
  payload: rsvp
})

export const getRsvp = () => async (dispatch) => {
  const res = await fetch('/api/rsvp');
  const data = await res.json();
  dispatch(setRsvp(data.rsvp));
  return res;
}

export const createRsvp = (rsvp) => async (dispatch) => {
  const { userId, content, eventId } = rsvp;
  const res = await csrfFetch('/api/rsvp', {
    method: 'POST',
    body: JSON.stringify({
      userId, content, eventId
    }),
  });
  const data = await res.json();
  dispatch(addRsvp(data.rsvp));
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
    default:
      return state;
  }
}

export default reducer