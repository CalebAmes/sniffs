import {id} from 'date-fns/locale';
import {csrfFetch} from './csrf';

const SET_EVENT = 'event/setEvent';
const ADD_EVENT = 'event/addEvent';
const DELETE_EVENT = 'event/deleteEvent';
const ADD_RSVP = 'event/ADD_RSVP';
const DELETE_RSVP = 'event/DELETE_RSVP';

const setEvent = event => ({
  type: SET_EVENT,
  payload: event,
});

const addEvent = event => ({
  type: ADD_EVENT,
  payload: event,
});

const deleteEvent = id => ({
  type: DELETE_EVENT,
  id,
});

export const addEventRsvp = payload => ({
    type: ADD_RSVP,
    payload,
});

export const removeEventRsvp = payload => ({
  type: DELETE_RSVP,
  payload,
});

export const getEvent = () => async dispatch => {
  const res = await fetch ('/api/event/');
  const data = await res.json ();
  dispatch (setEvent (data.event));
  return res;
};

export const getEventDetails = id => async dispatch => {
  const res = await fetch (`/api/event/${id}`);
  const data = await res.json ();
  dispatch (addEvent (data.event));
  return res;
};

export const createEvent = event => async dispatch => {
  const {name, description, dateStart, dateEnd, categoryId, userId} = event;
  const response = await csrfFetch ('/api/event/', {
    method: 'POST',
    body: JSON.stringify ({
      name,
      description,
      dateStart,
      dateEnd,
      categoryId,
      userId,
    }),
  });
  const data = await response.json ();
  dispatch (addEvent (data.event));
  return response;
};

export const updateEvent = event => async dispatch => {
  const {id, name, description, dateStart, dateEnd, categoryId, userId} = event;
  const res = await csrfFetch (`/api/event/${id}`, {
    method: 'PUT',
    body: JSON.stringify ({
      name,
      description,
      dateStart,
      dateEnd,
      categoryId,
      userId,
    }),
  });
  const data = await res.json ();
  dispatch (addEvent (data.event));
  return res;
};

export const removeEvent = id => async dispatch => {
  const res = await csrfFetch (`/api/event/${id}/delete`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify ({
      id,
    }),
  });
  await dispatch (deleteEvent (id));
  return res;
};

function reducer (state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_EVENT:
      newState = {...state};
      newState[action.payload.id] = action.payload;
      return newState;
    case SET_EVENT:
      newState = {};
      action.payload.forEach (item => {
        newState[item.id] = item;
      });
      return newState;
    case DELETE_EVENT:
      newState = {...state};
      delete newState[action.id];
      return newState;
    case ADD_RSVP:
      newState = {...state};
      newState[action.payload.eventId].Rsvps.push (action.payload.data);
      return newState;
    case DELETE_RSVP:
      newState = {...state};
      const arr = newState[action.payload.eventId].Rsvps;
      const index = arr.indexOf (action.payload.data);
      arr.splice (index, 1);
      return newState;
    default:
      return state;
  }
}

export default reducer;
