import {UPDATE_EVENTS, ADD_EVENT} from '../actions/events';

const initialState = {
  events: []
}
export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_EVENTS:
   //   return payload.reduce((events, event) => {
    //    events[event.id] = event
        return payload
    
    case ADD_EVENT:
    console.log('event payload', payload)
      return {
        ...state,
        events: [...state.events, payload]
      };
    default:
      return state;
  }
}