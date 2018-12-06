import * as request from 'superagent';
//import { isExpired } from '../jwt'
//import { logout } from './users'


const baseUrl = 'http://localhost:4000'

export const ADD_EVENT = 'ADD_EVENT'
export const UPDATE_EVENTS = 'UPDATE_EVENTS';

const updateEvents = (events) => ({
  type: UPDATE_EVENTS,
  payload: events
});


export const getEvents = () => (dispatch) => {

    request
      .get(`${baseUrl}/events`)
      .then(result => dispatch(updateEvents(result.body)))
      .catch(err => console.error(err))
  };

export const createEvent = (payload) => {
  return {
    type: ADD_EVENT,
    payload
  }
}