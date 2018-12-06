import {UPDATE_TICKETS_INFO} from '../actions/tickets';

export default (state = null, {type, payload}) => {
  switch (type) {
    case UPDATE_TICKETS_INFO:
        return payload.reduce((infos, info) => {
            infos[info.ticket_id] = info;
            return infos;
        }, {})
    default:
      return state;
  }
}