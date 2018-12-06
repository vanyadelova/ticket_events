import * as request from 'superagent';
import {baseUrl} from '../constants';
import {logout} from './users';
import {isExpired} from '../jwt';

export const GET_TICKET = 'GET_TICKET';
export const ADD_TICKET = 'ADD_TICKET';
export const UPDATE_TICKETS = 'UPDATE_TICKETS';
export const UPDATE_TICKET = 'UPDATE_TICKET';
export const UPDATE_TICKETS_INFO = 'UPDATE_TICKETS_INFO';
export const UPDATE_CUSTOMERS = 'UPDATE_CUSTOMERS';

const addTicket = (ticket) => ({
    type: ADD_TICKET,
    payload: ticket
});


const updateTicket = (ticket) => ({
    type: UPDATE_TICKET,
    payload: ticket
});

const updateTickets = (tickets) => ({
    type: UPDATE_TICKETS,
    payload: tickets
});

const updateTicketsInfo = (ticketsInfo) => ({
    type: UPDATE_TICKETS_INFO,
    payload: ticketsInfo
});

const getTickets = (ticket) => ({
    type: GET_TICKET,
    payload: ticket
});

const updateCustomers = (customers) => ({
    type: UPDATE_CUSTOMERS,
    payload: customers
});

export const getTicketsPerEvent = (eventId) => (dispatch) => {

    request
        .get(`${baseUrl}/events/${eventId}/tickets`)
        .then(result => {
            dispatch(updateTickets(result.body['tickets']));
            dispatch(updateTicketsInfo(result.body['ticketsInfo']));
            dispatch(updateCustomers(result.body['customers']));
        }).catch(err => console.error(err))

};


export const getTicket = (ticketId) => (dispatch) => {

    request
        .get(`${baseUrl}/tickets/${ticketId}`)
        .then(result => dispatch(getTickets(result.body)))
        .catch(err => console.error(err))
};

export const createTicket = (eventId, description, price, thumbnail) => (dispatch, getState) => {

    const state = getState();
    if (!state.currentUser) return null;
    const jwt = state.currentUser.jwt;
    if (isExpired(jwt)) return dispatch(logout());

    request
      .post(`${baseUrl}/events/${eventId}/tickets`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ description, price, thumbnail })
      .then(result => {
          dispatch(updateTicketsInfo(result.body['ticketsInfo']));
          dispatch(addTicket(result.body.ticketPayload)) ;
          dispatch(updateCustomers(result.body.custommerPayload));
          
    })
      .catch(err => console.error(err))
};

export const editTicket = (ticketId,  update ) => (dispatch, getState) => {

    const state = getState();
    if (!state.currentUser) return null;
    const jwt = state.currentUser.jwt;
  
    if (isExpired(jwt)) return dispatch(logout())
    request
      .put(`${baseUrl}/tickets/${ticketId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send( update )
      .then(result => dispatch(updateTicket(result.body)))
      .catch(err => console.error(err))
};