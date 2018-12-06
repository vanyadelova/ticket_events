import {UPDATE_COMMENTS, ADD_COMMENT} from '../actions/comments';

export default (state = null, {type, payload}) => {
  switch (type) {
    case UPDATE_COMMENTS:
      return  payload.reduce((comments, comment) => {
        comments[comment.id] = comment
        return comments
      }, {});
    case ADD_COMMENT:
        return {
        ...state,
        [payload.id]: payload
        };
    default:
      return state;
  }
}