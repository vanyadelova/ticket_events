import {UPDATE_TICKETS, ADD_TICKET, UPDATE_TICKET} from '../actions/tickets';

export default (state = null, {type, payload}) => {
  switch (type) {
    case UPDATE_TICKETS:
      return  payload.reduce((tickets, ticket) => {
        tickets[ticket.id] = ticket;
        return tickets;
      }, {});
    case UPDATE_TICKET:
      const aux = {...state};
      aux[payload.id] = payload;
      return aux;
    case ADD_TICKET:
      return {
        ...state,
        [payload.id]: payload
      };
    default:
      return state;
  }
}