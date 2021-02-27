import { csrfFetch } from './csrf';

const SET_EVENT = 'event/setEvent'
const ADD_EVENT = 'event/addEvent'

const setEvent = (event) => ({
  type: SET_EVENT,
  payload: event,
})

const addEvent = (event) => ({
  type: ADD_EVENT,
  payload: event,
})

export const getEvent = () => async (dispatch) => {
  const res = await fetch('/api/event');
  const data = await res.json();
  dispatch(setEvent(data.event))
  return res;
}

export const createEvent = (event) => async (dispatch) => {
  const { name, description, dateStart, dateEnd, categoryId, userId } = event;
  const response = await csrfFetch('/api/event', {
    method: 'POST',
    body: JSON.stringify({
      name,
      description,
      dateStart,
      dateEnd,
      categoryId,
      userId,
    }),
  });
  const data = await response.json();
  console.log(data)
  dispatch(addEvent(data.event));
  return response;
};

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_EVENT:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      console.log(newState)
      return newState;
    case SET_EVENT:
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