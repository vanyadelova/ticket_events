import * as request from 'superagent';
import {baseUrl} from '../constants';
import {logout} from './users';
import {isExpired} from '../jwt';

export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_TICKETS_INFO = 'UPDATE_TICKETS_INFO';

const updateComments = (comments) => ({
    type: UPDATE_COMMENTS,
    payload: comments
});

const addComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment
});

const updateTicketsInfo = (ticketsInfo) => ({
    type: UPDATE_TICKETS_INFO,
    payload: ticketsInfo
});

export const getCommentsPerTicket = (ticketId) => (dispatch) => {

    request
        .get(`${baseUrl}/tickets/${ticketId}/comments`)
        .then(result => dispatch(updateComments(result.body)))
        .catch(err => console.error(err))
};

export const createComment = (ticketId, message) => (dispatch, getState) => {

    const state = getState();
    if (!state.currentUser) return null;
    const jwt = state.currentUser.jwt;
    if (isExpired(jwt)) return dispatch(logout());
   
    request
      .post(`${baseUrl}/tickets/${ticketId}/comments`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ message })
      .then(result => {
          dispatch(addComment(result.body.commentsPayload));
          dispatch(updateTicketsInfo(result.body.infoPayload));
        })
      .catch(err => console.error(err))
};
