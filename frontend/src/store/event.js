const SET_EVENT = 'event/setEvent'

const setEvent = (event) => ({
  type: SET_EVENT,
  payload: event,
})

export const getEvent = () => async (dispatch) => {
  const res = await fetch('/api/event');
  const data = await res.json();
  dispatch(setEvent(data.event))
  return res;
}

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
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