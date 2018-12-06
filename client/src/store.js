import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import {storeJwt} from './middleware';
import reducers from './reducers';

const reducer = combineReducers(reducers);

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

const enhancer = compose(
	applyMiddleware(ReduxThunk, storeJwt),
	devTools
);

const store = createStore(reducer, enhancer);

export default store;