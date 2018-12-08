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

/*export const createEvent = (payload) => {
  return {
    type: ADD_EVENT,
    payload
  }
}*/

export const createEvent = (event) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(event)
    .then(response => dispatch({
        type: ADD_EVENT,
        payload: response.body
    }))
    .catch(err => console.error(err))
}

/*export const createEvent = () => (dispatch) => {

  request
    .post(`${baseUrl}/events`)
    .then(result => dispatch(updateEvents(result.body)))
    .catch(err => console.error(err))
};*/